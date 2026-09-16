<template>
  <section class="max-w-[1380px] mx-auto px-4 sm:px-6 py-16 sm:py-20">
    <div class="flex flex-col items-center text-center mb-12 space-y-3">
      <span class="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500">Opiniones</span>
      <h2 class="font-['Rajdhani'] text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
        Lo Que Dice La Comunidad
      </h2>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <article
        v-for="review in reviews"
        :key="review.id"
        class="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-6 flex flex-col gap-4"
      >
        <div class="flex items-center gap-0.5">
          <UIcon
            v-for="star in 5"
            :key="star"
            name="i-heroicons-star-solid"
            class="w-4 h-4"
            :class="star <= review.rating ? 'text-amber-400' : 'text-zinc-800'"
          />
        </div>

        <p class="text-sm text-zinc-300 leading-relaxed grow">
          &ldquo;{{ review.comment }}&rdquo;
        </p>

        <div class="flex items-center justify-between pt-3 border-t border-zinc-900">
          <span class="font-['Rajdhani'] font-bold text-white text-sm">{{ review.name }}</span>
          <span class="text-[10px] font-mono uppercase tracking-wide text-zinc-500">{{ review.game }}</span>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
const reviews = useReviews()
</script>
