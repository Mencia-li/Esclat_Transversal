<template>
    <footer class="w-full transition-colors duration-300">
        
        <div class="theme-base py-16 border-t border-foreground/10">
            <div class="max-w-6xl mx-auto px-6">
                <div class="flex flex-col md:flex-row md:justify-around gap-12">

                    <div class="space-y-6 text-center md:text-left">
                        <h3 class="text-2xl font-bold uppercase tracking-widest">
                            Contacto
                        </h3>
                        <div class="space-y-4 opacity-90 font-medium">
                            <p class="flex items-center gap-3 justify-center md:justify-start hover:opacity-100 transition-opacity">
                                <Mail class="w-5 h-5" />
                                <a
                                    href="mailto:mcaljy@gmail.com" 
                                    class="hover:underline ">
                                    mcaljy@gmail.com
                                </a>
                            </p>
                            <p class="flex items-center gap-3 justify-center md:justify-start">
                                <MapPin class="w-5 h-5" />
                                <span>
                                    Valencia, Valencia, ES
                                </span>
                            </p>
                        </div>
                    </div>

                    <div class="space-y-6 text-center md:text-left">
                        <h3 class="text-2xl font-bold uppercase tracking-widest">
                            ¿Nos vemos en redes?
                        </h3>
                        <div class="flex gap-6 justify-center md:justify-start">
                            
                            <a 
                                href="https://www.instagram.com/mencia_li" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                class="opacity-85 hover:scale-110 transition-transform hover:opacity-100" 
                                aria-label="Instagram"
                            >
                                <div 
                                    class="w-8 h-8 bg-foreground" 
                                    style="mask: url('/img/logos/instagram_logo.svg') no-repeat center / contain; -webkit-mask: url('/img/logos/instagram_logo.svg') no-repeat center / contain;"
                                ></div>
                            </a>

                            <a 
                                href="https://www.tiktok.com/@mencia_li" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                class="opacity-85 hover:scale-110 transition-transform hover:opacity-100" 
                                aria-label="TikTok"
                            >
                                <div 
                                    class="w-8 h-8 bg-foreground" 
                                    style="mask: url('/img/logos/tiktok_logo.svg') no-repeat center / contain; -webkit-mask: url('/img/logos/tiktok_logo.svg') no-repeat center / contain;"
                                ></div>
                            </a>

                            <a 
                                href="https://www.youtube.com/@mencia_li" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                class="opacity-85 hover:scale-110 transition-transform hover:opacity-100" 
                                aria-label="YouTube"
                            >
                                <div 
                                    class="w-8 h-8 bg-foreground" 
                                    style="mask: url('/img/logos/youtube_logo.svg') no-repeat center / contain; -webkit-mask: url('/img/logos/youtube_logo.svg') no-repeat center / contain;"
                                ></div>
                            </a>

                            <a 
                                href="https://www.linkedin.com/in/jiayi-li-998177372/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                class="opacity-85 hover:scale-110 transition-transform hover:opacity-100" 
                                aria-label="LinkedIn"
                            >
                                <div 
                                    class="w-8 h-8 bg-foreground" 
                                    style="mask: url('/img/logos/linkedin_logo.svg') no-repeat center / contain; -webkit-mask: url('/img/logos/linkedin_logo.svg') no-repeat center / contain;"
                                ></div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full theme-invert py-6 transition-colors duration-300">
            <div class="max-w-6xl mx-auto px-6 text-center text-sm font-bold uppercase tracking-tighter opacity-80">
                <p>© {{ new Date().getFullYear() }} MENCÍA LI. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { 
    Mail, 
    MapPin
} from 'lucide-vue-next';
</script>