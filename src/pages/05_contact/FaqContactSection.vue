<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import { Send, Ticket } from "lucide-vue-next"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
import { faqs, festivalInfo } from "@/data/festival"

type ContactField = "name" | "email" | "message"

const form = reactive({
  name: "",
  email: "",
  requestType: "",
  message: "",
})

const submitted = ref(false)
const triedSubmit = ref(false)

const validEmail = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
const canSubmit = computed(
  () =>
    form.name.trim().length > 1 &&
    validEmail.value &&
    form.requestType.length > 0 &&
    form.message.trim().length > 8,
)

function updateField(field: ContactField, event: Event) {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  form[field] = target.value
  submitted.value = false
}

function submitForm() {
  triedSubmit.value = true

  if (!canSubmit.value) {
    return
  }

  submitted.value = true
}
</script>

<template>
  <section class="festival-section-center bg-secondary">
    <div class="section-container grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      <div>
        <p class="text-sm font-semibold uppercase text-primary">FAQs</p>
        <h2 class="mt-3 text-4xl font-semibold text-foreground sm:text-5xl">Preguntas frecuentes.</h2>

        <Accordion type="single" collapsible class="mt-8 rounded-lg border border-border bg-background px-6">
          <AccordionItem v-for="faq in faqs" :key="faq.id" :value="faq.id">
            <AccordionTrigger>{{ faq.question }}</AccordionTrigger>
            <AccordionContent class="text-muted-foreground">
              {{ faq.answer }}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <Card id="contacto" class="scroll-mt-20 bg-background">
        <CardHeader>
          <div class="flex items-center gap-3 text-primary">
            <Ticket class="size-5" />
            <span class="text-sm font-semibold uppercase">Entradas y contacto</span>
          </div>
          <CardTitle class="text-3xl leading-tight">Hablemos del festival.</CardTitle>
        </CardHeader>

        <CardContent class="space-y-6 pb-6">
          <p class="text-sm leading-relaxed text-muted-foreground">
            Escríbenos para acreditaciones, entradas, colaboraciones de marca o información profesional del proyecto.
          </p>

          <form class="space-y-4" @submit.prevent="submitForm">
            <div class="space-y-2">
              <Label for="contact-name">Nombre</Label>
              <Input
                id="contact-name"
                :value="form.name"
                placeholder="Tu nombre"
                @input="updateField('name', $event)"
              />
            </div>

            <div class="space-y-2">
              <Label for="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                :value="form.email"
                placeholder="tu@email.com"
                @input="updateField('email', $event)"
              />
            </div>

            <div class="space-y-2">
              <Label for="contact-request">Tipo de solicitud</Label>
              <Select v-model="form.requestType">
                <SelectTrigger id="contact-request">
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entradas">Entradas</SelectItem>
                  <SelectItem value="acreditaciones">Acreditaciones</SelectItem>
                  <SelectItem value="colaboraciones">Colaboraciones de marca</SelectItem>
                  <SelectItem value="informacion">Información general</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div class="space-y-2">
              <Label for="contact-message">Mensaje</Label>
              <Textarea
                id="contact-message"
                :value="form.message"
                placeholder="Cuéntanos qué necesitas"
                @input="updateField('message', $event)"
              />
            </div>

            <p v-if="triedSubmit && !canSubmit" class="text-sm font-medium text-primary">
              Completa nombre, email válido, tipo de solicitud y un mensaje de al menos 9 caracteres.
            </p>

            <p v-if="submitted" class="rounded-md bg-secondary px-3 py-2 text-sm font-medium text-foreground">
              Mensaje preparado. Te responderemos en {{ festivalInfo.email }}.
            </p>

            <Button type="submit" class="w-full">
              <Send class="size-4" />
              Enviar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
