<template>
    <section id="contacto" class="min-h-screen theme-invert px-6 py-20 transition-colors duration-300">
        <div class="container mx-auto max-w-5xl">
        
        <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center uppercase tracking-widest">
            Contacto
        </h2>
            
        <div class="flex flex-col lg:flex-row gap-8 items-stretch">

            <div class="hidden lg:block w-full lg:w-1/2 rounded-lg overflow-hidden shadow-lg border border-background/20">
            <div class="h-full min-h-112.5">
                <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.1764669866164!2d-0.3440796!3d39.4823292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6048ae00000001%3A0x2d3a049971059f6!2sUniversitat%20Polit%C3%A8cnica%20de%20Val%C3%A8ncia!5e0!3m2!1ses!2ses!4v1710000000000!5m2!1ses!2ses"
                width="100%" 
                height="100%" 
                style="border:0;" 
                allowfullscreen
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade"
                class="w-full h-full"
                ></iframe>
            </div>
            </div>

            <div class="w-full max-w-md mx-auto lg:max-w-none lg:w-1/2">
            <form @submit.prevent="handleSubmit" class="space-y-6 p-8 rounded-lg shadow-xl border border-background/10 bg-background/5 h-full">
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                    <Label for="nombre" class="font-semibold">Nombre</Label>
                    <Input id="nombre" v-model="formData.nombre" class="theme-invert border-background/30" required />
                </div>
                <div class="space-y-2">
                    <Label for="apellido" class="font-semibold">Apellido</Label>
                    <Input id="apellido" v-model="formData.apellido" class="theme-invert border-background/30" required />
                </div>
                </div>
                    
                <div class="space-y-2">
                <Label for="email" class="font-semibold">Email</Label>
                <Input id="email" type="email" v-model="formData.email" class="theme-invert border-background/30" required />
                </div>

                <div class="space-y-2">
                <Label class="font-semibold">Tipo de Proyecto</Label>
                <Select v-model="formData.tipoProyecto" required>
                    <SelectTrigger class="theme-invert border-background/30">
                    <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent class="theme-invert border-background">
                    <SelectItem value="ilustracion">Ilustración Personalizada</SelectItem>
                    <SelectItem value="branding">Identidad Visual / Branding</SelectItem>
                    <SelectItem value="web">Diseño Web / UI</SelectItem>
                    </SelectContent>
                </Select>
                </div>

                <div class="flex flex-col space-y-2">
                <Label class="font-semibold">Fecha estimada</Label>
                <Popover>
                    <PopoverTrigger as-child>
                    <Button variant="outline" class="w-full justify-start text-left theme-invert border-background/30">
                        <span v-if="dies">{{ dies.day }}/{{ dies.month }}/{{ dies.year }}</span>
                        <span v-else>Selecciona una fecha</span>
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent class="w-auto p-0 bg-foreground border-background">
                    <Calendar v-model="dies" />
                    </PopoverContent>
                </Popover>
                </div>

                <Button type="submit" class="w-full theme-base hover:opacity-90 transition-all font-bold py-6">
                Enviar Solicitud
                </Button>
            </form>
            </div>

        </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { DateValue } from 'reka-ui'

// Componentes Shadcn
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface ContactForm {
    nombre: string
    apellido: string
    email: string
    tipoProyecto: string
}

const formData = ref<ContactForm>({
    nombre: '',
    apellido: '',
    email: '',
    tipoProyecto: ''
})

const dies = ref<DateValue>()

function handleSubmit(): void {
    console.log('Datos:', { ...formData.value, fecha: dies.value })
    alert(`¡Gracias ${formData.value.nombre}! Tu solicitud ha sido enviada.`)
    // Reset
    formData.value = { nombre: '', apellido: '', email: '', tipoProyecto: '' }
    dies.value = undefined
}
</script>