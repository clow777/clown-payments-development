'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const segments = [
  { value: 'creator', label: 'Criador de conteúdo' },
  { value: 'casino', label: 'Cassino / Bet licenciado' },
  { value: 'info', label: 'Infoproduto' },
  { value: 'other', label: 'Outros' },
]

export function FormControlsDemo() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div className="flex flex-col gap-2">
        <Label htmlFor="ds-amount" className="text-foreground">Valor (R$)</Label>
        <Input id="ds-amount" inputMode="decimal" placeholder="49,90" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="ds-segment" className="text-foreground">Segmento</Label>
        <Select items={segments} defaultValue="creator">
          <SelectTrigger id="ds-segment" className="h-11 w-full rounded-xl bg-card/60 px-4">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {segments.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2 md:col-span-2">
        <Label htmlFor="ds-invalid" className="text-foreground">Chave PIX</Label>
        <Input id="ds-invalid" aria-invalid defaultValue="chave-invalida" aria-describedby="ds-invalid-hint" />
        <p id="ds-invalid-hint" className="text-xs text-primary">A chave precisa estar em nome do titular da conta.</p>
      </div>
    </div>
  )
}

export function OverlaysDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>Abrir modal</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar saque</DialogTitle>
            <DialogDescription>
              R$ 12.480,00 para a chave PIX ***.482.019-** em nome de Estúdio Noir LTDA.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>Cancelar</DialogClose>
            <DialogClose
              render={<Button />}
              onClick={() => toast.success('Saque solicitado', { description: 'Você receberá o comprovante no Telegram.' })}
            >
              Confirmar com 2FA
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button variant="outline" onClick={() => toast.success('Venda paga · R$ 49,90', { description: 'Plano VIP mensal' })}>
        Toast de sucesso
      </Button>
      <Button variant="outline" onClick={() => toast.error('Webhook falhou', { description: 'Nova tentativa em 2 minutos.' })}>
        Toast de erro
      </Button>
    </div>
  )
}

export function TabsDemo() {
  return (
    <Tabs defaultValue="hoje">
      <TabsList>
        <TabsTrigger value="hoje">Hoje</TabsTrigger>
        <TabsTrigger value="semana">Semana</TabsTrigger>
        <TabsTrigger value="mes">Mês</TabsTrigger>
      </TabsList>
      <TabsContent value="hoje" className="pt-4 text-sm">128 vendas · R$ 6.387,20</TabsContent>
      <TabsContent value="semana" className="pt-4 text-sm">902 vendas · R$ 44.910,80</TabsContent>
      <TabsContent value="mes" className="pt-4 text-sm">3.814 vendas · R$ 190.318,60</TabsContent>
    </Tabs>
  )
}
