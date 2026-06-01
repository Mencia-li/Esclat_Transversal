<script lang="ts" setup>
 import { Button } from '@/components/ui/button';
 import LogoSimpsons from "@/components/LogoSimpsons.vue"

</script>



<template>

<div class="bg-[#ffde00] min-h-screen text-center p-4 flex flex-col items-center justify-center">
    
 <LogoSimpsons estilus="w-[24rem] sm:w-[24rem]"n/>

	<h1 class="text-xl my-1 font-medium">
     Discover some of the most amazing Quotes from The Simpsons
	</h1>
	<div>
     <strong>This is an unofficial app (even though it looks so cool!)</strong>
	</div>

	<div className="mt-8 flex gap-5">
		<Button variant="tertiarius" size="elongatis">
      	 <RouterLink to="/">Exit</RouterLink>
    	</Button>
    	<Button variant="tertiarius" size="elongatis">
      	 <RouterLink to="/simpsons/about">Enter</RouterLink>
    	</Button>
	</div>

    <div class="flex gap-12">

        <img class="object-contain mt-12 hidden md:block" src="/imagines/simpsons/bart.png" alt="" width="200px">
        <img class="object-contain mt-20 hidden md:block" src="/imagines/simpsons/homer.png" alt="" width="185px">
        <img class="object-contain mt-12 md:mt-0" src="/imagines/simpsons/moe.png" alt="" width="220px">

    </div>




</div>
</template>