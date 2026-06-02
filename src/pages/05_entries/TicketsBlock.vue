<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import { RouterLink } from "vue-router"
import { ArrowUpRight, BadgeCheck, CheckCircle2, Mail, Ticket } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import { ticketOptions } from "@/data/festival"

type AccessField = "firstName" | "lastName" | "email" | "notes"

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  ticketId: ticketOptions[0]?.id ?? "",
  notes: "",
})

const submitted = ref(false)
const triedSubmit = ref(false)

const selectedTicket = computed(() => ticketOptions.find((ticket) => ticket.id === form.ticketId) ?? ticketOptions[0])
const validEmail = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
const canSubmit = computed(() => (
  form.firstName.trim().length > 1 &&
  form.lastName.trim().length > 1 &&
  validEmail.value &&
  form.ticketId.length > 0
))

function updateField(field: AccessField, event: Event) {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  form[field] = target.value
  submitted.value = false
}

function submitAccess() {
  triedSubmit.value = true

  if (!canSubmit.value) {
    return
  }

  submitted.value = true
}
</script>

<template>
  <Card data-reveal="clip" class="min-h-0 overflow-hidden border-0 bg-primary text-primary-foreground lg:h-full">
    <CardContent class="grid min-h-[36rem] p-0 lg:h-full lg:grid-cols-[1fr_0.78fr]">
      <div class="flex min-h-[26rem] flex-col justify-between p-6 sm:p-8">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="inline-flex items-center gap-2 rounded-md bg-background px-3 py-2 text-xs font-semibold uppercase text-foreground">
              <Ticket class="size-4" />
              Acceso gratuito
            </p>
            <h3 class="mt-5 max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">
              Reserva tu plaza en los talleres de ESCLAT.
            </h3>
          </div>
          <span class="hidden rounded-md border border-background/30 px-3 py-2 text-sm font-semibold sm:inline-flex">
            0 EUR
          </span>
        </div>

        <div class="mt-8 rounded-xl border border-background/25 bg-background/10 p-4 shadow-inner">
          <div class="grid gap-3 sm:grid-cols-[1fr_auto]">
            <div class="relative overflow-hidden rounded-lg bg-background p-5 text-foreground">
              <div class="absolute bottom-0 right-20 top-0 border-l border-dashed border-primary/40" />
              <div class="flex h-full min-h-40 flex-col justify-between">
                <div class="flex items-center justify-between gap-4">
                  <span class="text-xs font-semibold uppercase text-primary">ESCLAT 2026</span>
                  <BadgeCheck class="size-5 text-primary" />
                </div>
                <div>
                  <p class="text-3xl font-semibold leading-none">Entrada gratis</p>
                  <p class="mt-3 max-w-sm text-sm text-muted-foreground">
                    Las Naves · 23-25 octubre · 16:00-00:00 h
                  </p>
                </div>
              </div>
            </div>

            <div class="flex min-h-40 min-w-24 flex-col items-center justify-between rounded-lg bg-background/90 px-4 py-5 text-foreground">
              <Ticket class="size-6 text-primary" />
              <span class="text-center text-xs font-semibold uppercase leading-tight">Libre acceso</span>
              <span class="text-xs text-muted-foreground">QR</span>
            </div>
          </div>
        </div>

        <div class="mt-6 flex flex-wrap items-center gap-3">
          <Button as-child variant="secondary" size="lg">
            <RouterLink :to="{ path: '/entradas', hash: '#contacto' }">
              Reservar gratis
              <ArrowUpRight class="size-4" />
            </RouterLink>
          </Button>
          <span class="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/85">
            <CheckCircle2 class="size-4" />
            Sin pago ni gastos de gestión
          </span>
        </div>
      </div>

      <div id="contacto" class="scroll-mt-20 bg-background p-5 text-foreground sm:p-6 lg:overflow-y-auto">
        <div class="mb-5 flex items-center gap-3 text-primary">
          <Mail class="size-5" />
          <span class="text-sm font-semibold uppercase">Inscripción</span>
        </div>

        <form class="space-y-4" @submit.prevent="submitAccess">
          <div class="space-y-2">
            <Label for="access-type">Tipo de acceso</Label>
            <Select v-model="form.ticketId">
              <SelectTrigger id="access-type">
                <SelectValue placeholder="Selecciona un acceso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="ticket in ticketOptions" :key="ticket.id" :value="ticket.id">
                  {{ ticket.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div v-if="selectedTicket" class="rounded-lg border border-border bg-secondary p-4">
            <p class="text-sm font-semibold text-foreground">{{ selectedTicket.access }}</p>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
              {{ selectedTicket.description }}
            </p>
          </div>

          <div class="space-y-2">
            <Label for="access-name">Nombre</Label>
            <Input
              id="access-name"
              :value="form.firstName"
              placeholder="Nombre"
              @input="updateField('firstName', $event)"
            />
          </div>

          <div class="space-y-2">
            <Label for="access-last-name">Apellido</Label>
            <Input
              id="access-last-name"
              :value="form.lastName"
              placeholder="Apellido"
              @input="updateField('lastName', $event)"
            />
          </div>

          <div class="space-y-2">
            <Label for="access-email">Correo</Label>
            <Input
              id="access-email"
              type="email"
              :value="form.email"
              placeholder="tu@email.com"
              @input="updateField('email', $event)"
            />
          </div>

          <div class="space-y-2">
            <Label for="access-notes">Notas</Label>
            <Textarea
              id="access-notes"
              :value="form.notes"
              placeholder="Talleres, accesibilidad o dudas"
              class="min-h-20"
              @input="updateField('notes', $event)"
            />
          </div>

          <p v-if="triedSubmit && !canSubmit" class="text-sm font-medium text-primary">
            Completa el nombre, el apellido, un correo válido y el tipo de acceso.
          </p>

          <p v-if="submitted" class="rounded-md bg-secondary px-3 py-2 text-sm font-medium text-foreground">
            Solicitud recibida. Enviaremos la confirmación gratuita a {{ form.email }}.
          </p>

          <Button type="submit" class="w-full">
            <CheckCircle2 class="size-4" />
            Confirmar inscripción
          </Button>
        </form>
      </div>
    </CardContent>
  </Card>
</template>
