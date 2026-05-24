<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import { RouterLink } from "vue-router"
import {
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardList,
  Mail,
  Package,
  ShieldCheck,
  ShoppingBag,
  Ticket,
} from "lucide-vue-next"
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
import { accessSteps, safetyRules, ticketOptions } from "@/data/festival"

type AccessField = "name" | "email" | "notes"

const form = reactive({
  name: "",
  email: "",
  ticketId: ticketOptions[0]?.id ?? "",
  notes: "",
})

const submitted = ref(false)
const triedSubmit = ref(false)

const merchItems = [
  "Camiseta azul Esclat",
  "Tote bag del festival",
  "Prints y pegatinas",
]

const selectedTicket = computed(() => ticketOptions.find((ticket) => ticket.id === form.ticketId) ?? ticketOptions[0])
const validEmail = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
const canSubmit = computed(() => form.name.trim().length > 1 && validEmail.value && form.ticketId.length > 0)

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
  <section class="festival-section-shop festival-theme-alt">
    <div class="shop-section-container">
      <div data-reveal class="mb-5 flex shrink-0 flex-col gap-3 md:flex-row md:items-end md:justify-between lg:mb-4">
        <div>
          <p class="text-sm font-semibold uppercase text-primary">Entradas gratuitas</p>
          <h2 class="mt-2 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">Tienda.</h2>
        </div>

        <p class="max-w-md text-sm leading-relaxed text-muted-foreground">
          El acceso a ESCLAT es gratuito. Solo los talleres necesitan inscripción previa por aforo limitado.
        </p>
      </div>

      <div class="grid min-h-0 flex-1 gap-5 lg:grid-cols-[1.55fr_0.85fr]">
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
                    <div class="absolute bottom-0 top-0 right-20 border-l border-dashed border-primary/40" />
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
                  <RouterLink :to="{ path: '/tienda', hash: '#contacto' }">
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
                    :value="form.name"
                    placeholder="Nombre y apellidos"
                    @input="updateField('name', $event)"
                  />
                </div>

                <div class="space-y-2">
                  <Label for="access-email">Email</Label>
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
                  Completa el nombre, un email válido y el tipo de acceso.
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

        <Card
          data-reveal="clip"
          style="--reveal-delay: 140ms"
          class="min-h-[36rem] overflow-hidden border-0 bg-[#86a0d5] text-background lg:h-full"
        >
          <CardHeader class="p-6 sm:p-8">
            <div class="flex items-center justify-between gap-4">
              <p class="inline-flex items-center gap-2 rounded-md bg-background/15 px-3 py-2 text-xs font-semibold uppercase">
                <ShoppingBag class="size-4" />
                Merch
              </p>
              <Package class="size-6" />
            </div>
            <CardTitle class="pt-8 text-4xl leading-tight sm:text-5xl">
              Merch oficial.
            </CardTitle>
          </CardHeader>

          <CardContent class="flex h-full flex-col justify-between gap-6 p-6 pt-0 sm:p-8 sm:pt-0">
            <div class="grid gap-3">
              <div class="rounded-xl bg-background/90 p-5 text-foreground">
                <div class="mx-auto aspect-[3/4] max-w-40 rounded-t-3xl rounded-b-lg bg-primary shadow-lg">
                  <div class="mx-auto h-10 w-16 rounded-b-full bg-[#86a0d5]" />
                  <p class="px-5 pt-12 text-center text-2xl font-semibold text-primary-foreground">ESCLAT</p>
                </div>
              </div>

              <div class="grid gap-2">
                <p v-for="item in merchItems" :key="item" class="flex items-center gap-2 text-sm font-semibold">
                  <CheckCircle2 class="size-4" />
                  {{ item }}
                </p>
              </div>
            </div>

            <Button as-child variant="secondary" size="lg" class="w-fit">
              <RouterLink :to="{ path: '/tienda', hash: '#contacto' }">
                Consultar merch
                <ArrowUpRight class="size-4" />
              </RouterLink>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div class="mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <section data-reveal class="rounded-md border border-border bg-background p-6">
          <div class="mb-6 flex items-center gap-3 text-primary">
            <ClipboardList class="size-5" />
            <h3 class="text-2xl font-semibold text-foreground">Cómo asistir.</h3>
          </div>

          <div class="grid gap-4">
            <article
              v-for="(step, index) in accessSteps"
              :key="step.id"
              class="grid grid-cols-[2.5rem_1fr] gap-3"
            >
              <span class="flex size-10 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
                {{ index + 1 }}
              </span>
              <div>
                <h4 class="font-semibold text-foreground">{{ step.title }}</h4>
                <p class="mt-1 text-sm leading-relaxed text-muted-foreground">{{ step.summary }}</p>
              </div>
            </article>
          </div>
        </section>

        <section data-reveal style="--reveal-delay: 120ms" class="rounded-md border border-border bg-secondary p-6">
          <div class="mb-6 flex items-center gap-3 text-primary">
            <ShieldCheck class="size-5" />
            <h3 class="text-2xl font-semibold text-foreground">Normas básicas.</h3>
          </div>

          <div class="grid gap-3 sm:grid-cols-2">
            <article
              v-for="rule in safetyRules"
              :key="rule.id"
              class="rounded-md bg-background p-4"
            >
              <h4 class="font-semibold text-foreground">{{ rule.title }}</h4>
              <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{{ rule.summary }}</p>
            </article>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>
