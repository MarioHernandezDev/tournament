<template>
  <div class="space-y-6 pt-8 text-left">
    <h2 class="font-['Rajdhani'] text-3xl font-bold text-center">Preguntas Frecuentes</h2>
    <UAccordion 
      color="gray"
      variant="soft"
      size="md"
      :items="[
        { label: '¿Cómo cobro los premios ganados?', content: 'Los pagos de RP y VP se envían en código o recarga directa en un plazo de 24 a 48 horas tras finalizar el torneo.' },
        { label: '¿Puedo participar sin equipo?', content: 'Sí, disponemos de una sección de búsqueda de equipo (Free Agents) en nuestro servidor de Discord para que encuentres compañeros de tu rango.' },
        { label: '¿Qué ocurre si un equipo hace trampas?', content: 'Contamos con moderadores en vivo. Cualquier reporte verificado con capturas o grabaciones conlleva la descalificación inmediata del equipo.' }
      ]"
    />
  </div>
</template>