// Builds a PIX "copia e cola" payload following the BACEN EMV® QRCPS-MPM spec (BR Code).

type BrCodeInput = {
  pixKey: string
  amountCents: number
  merchantName: string
  merchantCity: string
  txid: string
  description?: string
}

function field(id: string, value: string) {
  const length = value.length.toString().padStart(2, '0')
  if (value.length > 99) throw new Error(`BR Code field ${id} exceeds 99 chars`)
  return `${id}${length}${value}`
}

function sanitize(value: string, max: number) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9 .\-]/g, '')
    .toUpperCase()
    .slice(0, max)
}

export function crc16ccitt(payload: string) {
  let crc = 0xffff
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8
    for (let bit = 0; bit < 8; bit++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0')
}

export function buildPixBrCode(input: BrCodeInput) {
  if (!Number.isInteger(input.amountCents) || input.amountCents <= 0) {
    throw new Error('amountCents must be a positive integer')
  }
  const amount = `${Math.floor(input.amountCents / 100)}.${(input.amountCents % 100).toString().padStart(2, '0')}`
  const txid = input.txid.replace(/[^A-Za-z0-9]/g, '').slice(0, 25) || '***'

  const merchantAccount =
    field('00', 'br.gov.bcb.pix') +
    field('01', input.pixKey) +
    (input.description ? field('02', sanitize(input.description, 40)) : '')

  const body =
    field('00', '01') +
    field('26', merchantAccount) +
    field('52', '0000') +
    field('53', '986') +
    field('54', amount) +
    field('58', 'BR') +
    field('59', sanitize(input.merchantName, 25)) +
    field('60', sanitize(input.merchantCity, 15)) +
    field('62', field('05', txid)) +
    '6304'

  return body + crc16ccitt(body)
}
