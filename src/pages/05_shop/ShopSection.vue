<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import { CreditCard, LockKeyhole, MapPin, Minus, Plus, ShieldCheck, Ticket } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { festivalInfo, ticketOptions } from "@/data/festival"

type PurchaseField = "name" | "email" | "notes"

const mapSrc =
  "https://www.google.com/maps?q=Las%20Naves%20Valencia&output=embed"

const form = reactive({
  name: "",
  email: "",
  ticketId: ticketOptions[1]?.id ?? ticketOptions[0]?.id ?? "",
  paymentMethod: "tarjeta",
  notes: "",
})

const quantity = ref(2)
const submitted = ref(false)
const triedSubmit = ref(false)

const validEmail = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
const selectedTicket = computed(() => ticketOptions.find((ticket) => ticket.id === form.ticketId) ?? ticketOptions[0])
const subtotal = computed(() => (selectedTicket.value?.price ?? 0) * quantity.value)
const serviceFee = computed(() => quantity.value * 1.2)
const total = computed(() => subtotal.value + serviceFee.value)
const canSubmit = computed(
  () =>
    form.name.trim().length > 1 &&
    validEmail.value &&
    form.ticketId.length > 0 &&
    form.paymentMethod.length > 0,
)

function formatPrice(value: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(value)
}

function updateField(field: PurchaseField, event: Event) {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  form[field] = target.value
  submitted.value = false
}

function updateQuantity(change: number) {
  quantity.value = Math.min(6, Math.max(1, quantity.value + change))
  submitted.value = false
}

function submitPurchase() {
  triedSubmit.value = true

  if (!canSubmit.value) {
    return
  }

  submitted.value = true
}
</script>

<template>
  <section class="festival-section-shop bg-secondary">
    <div class="shop-section-container">
      <div data-reveal class="mb-5 flex shrink-0 flex-col gap-3 md:flex-row md:items-end md:justify-between lg:mb-4">
        <div>
          <p class="text-sm font-semibold uppercase text-primary">Tienda</p>
          <h2 class="mt-2 text-4xl font-semibold text-foreground sm:text-5xl">Entradas.</h2>
        </div>

        <p class="max-w-md text-sm leading-relaxed text-muted-foreground">
          Compra o reserva tus entradas para Esclat con un resumen claro antes de confirmar.
        </p>
      </div>

      <div class="grid min-h-0 flex-1 gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <Card data-reveal="clip" class="min-h-0 overflow-hidden bg-background lg:h-full">
          <CardHeader class="shrink-0 px-5 pt-5">
            <div class="flex items-center gap-3 text-primary">
              <MapPin class="size-5" />
              <span class="text-sm font-semibold uppercase">Ubicación</span>
            </div>
            <CardTitle class="text-2xl leading-tight md:text-3xl">{{ festivalInfo.place }}</CardTitle>
          </CardHeader>

          <CardContent class="flex min-h-0 flex-1 flex-col gap-3 px-5 pb-5">
            <div class="min-h-64 flex-1 overflow-hidden rounded-lg border border-border bg-muted md:min-h-80 lg:min-h-0">
              <iframe
                :src="mapSrc"
                width="100%"
                height="100%"
                style="border:0;"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                class="size-full"
                title="Mapa del lugar del evento Esclat"
              />
            </div>

            <p class="shrink-0 text-sm leading-relaxed text-muted-foreground">
              Acceso recomendado en transporte público. La validación de entradas se hará en el punto de acceso principal.
            </p>
          </CardContent>
        </Card>

        <Card
          id="contacto"
          data-reveal="clip"
          style="--reveal-delay: 140ms"
          class="scroll-mt-20 min-h-0 overflow-hidden bg-background lg:h-full"
        >
          <CardHeader class="shrink-0 border-b border-border bg-foreground px-5 pt-5 pb-5 text-background">
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-3 text-background">
                <Ticket class="size-5" />
                <span class="text-sm font-semibold uppercase">Compra de entradas</span>
              </div>
              <span class="inline-flex items-center gap-2 rounded-md bg-background/10 px-3 py-1 text-xs font-semibold">
                <LockKeyhole class="size-3" />
                Pago seguro
              </span>
            </div>
            <CardTitle class="text-3xl leading-tight">Reserva tu acceso.</CardTitle>
          </CardHeader>

          <CardContent class="min-h-0 space-y-5 overflow-y-auto px-5 py-5 lg:flex-1">
            <div class="grid gap-3">
              <Button
                v-for="ticket in ticketOptions"
                :key="ticket.id"
                type="button"
                :variant="form.ticketId === ticket.id ? 'default' : 'outline'"
                class="h-auto w-full justify-between p-4 text-left"
                @click="form.ticketId = ticket.id"
              >
                <span class="min-w-0 space-y-1">
                  <span class="block text-base font-semibold">{{ ticket.name }}</span>
                  <span class="block whitespace-normal text-xs opacity-80">{{ ticket.description }}</span>
                </span>
                <span class="shrink-0 text-base font-semibold">{{ formatPrice(ticket.price) }}</span>
              </Button>
            </div>

            <form class="space-y-4" @submit.prevent="submitPurchase">
              <div class="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
                <div class="space-y-2">
                  <Label>Tipo de entrada</Label>
                  <Select v-model="form.ticketId">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una entrada" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem v-for="ticket in ticketOptions" :key="ticket.id" :value="ticket.id">
                        {{ ticket.name }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div class="space-y-2">
                  <Label>Cantidad</Label>
                  <div class="flex h-9 items-center rounded-md border border-input bg-background">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Quitar entrada"
                      :disabled="quantity === 1"
                      @click="updateQuantity(-1)"
                    >
                      <Minus class="size-4" />
                    </Button>
                    <span class="w-10 text-center text-sm font-semibold tabular-nums">{{ quantity }}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Añadir entrada"
                      :disabled="quantity === 6"
                      @click="updateQuantity(1)"
                    >
                      <Plus class="size-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div class="space-y-2">
                <Label for="ticket-name">Nombre del comprador</Label>
                <Input
                  id="ticket-name"
                  :value="form.name"
                  placeholder="Nombre y apellidos"
                  @input="updateField('name', $event)"
                />
              </div>

              <div class="space-y-2">
                <Label for="ticket-email">Email de confirmación</Label>
                <Input
                  id="ticket-email"
                  type="email"
                  :value="form.email"
                  placeholder="tu@email.com"
                  @input="updateField('email', $event)"
                />
              </div>

              <div class="space-y-2">
                <Label for="payment-method">Método de pago</Label>
                <Select v-model="form.paymentMethod">
                  <SelectTrigger id="payment-method">
                    <SelectValue placeholder="Selecciona un método" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tarjeta">Tarjeta bancaria</SelectItem>
                    <SelectItem value="bizum">Bizum</SelectItem>
                    <SelectItem value="taquilla">Pago en taquilla</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div class="space-y-2">
                <Label for="ticket-notes">Notas</Label>
                <Textarea
                  id="ticket-notes"
                  :value="form.notes"
                  placeholder="Accesibilidad, acreditaciones o dudas sobre la reserva"
                  class="min-h-20"
                  @input="updateField('notes', $event)"
                />
              </div>

              <div class="rounded-lg border border-border bg-secondary p-4">
                <div class="mb-3 flex items-center gap-2 font-semibold text-foreground">
                  <CreditCard class="size-4 text-primary" />
                  Resumen
                </div>
                <div class="space-y-2 text-sm text-muted-foreground">
                  <div class="flex justify-between gap-4">
                    <span>{{ selectedTicket?.name }} x {{ quantity }}</span>
                    <span class="font-medium text-foreground">{{ formatPrice(subtotal) }}</span>
                  </div>
                  <div class="flex justify-between gap-4">
                    <span>Gastos de gestión</span>
                    <span class="font-medium text-foreground">{{ formatPrice(serviceFee) }}</span>
                  </div>
                  <div class="border-t border-border pt-3">
                    <div class="flex justify-between gap-4 text-base font-semibold text-foreground">
                      <span>Total</span>
                      <span>{{ formatPrice(total) }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p v-if="triedSubmit && !canSubmit" class="text-sm font-medium text-primary">
                Completa el nombre, un email válido, tipo de entrada y método de pago.
              </p>

              <p v-if="submitted" class="rounded-md bg-secondary px-3 py-2 text-sm font-medium text-foreground">
                Reserva preparada. Enviaremos la confirmación a {{ form.email }}.
              </p>

              <Button type="submit" class="w-full">
                <ShieldCheck class="size-4" />
                Confirmar reserva
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
