/**
 * Reseñas de clientes (mock).
 */
const seedReviews = () => [
  { id: 1, name: 'Marcos G.', rating: 5, game: 'Valorant', comment: 'El mejor local para jugar competitivo, los setups son una locura y el ambiente en los torneos es brutal.' },
  { id: 2, name: 'Lucía R.', rating: 5, game: 'League of Legends', comment: 'Me apunté a mi primer torneo de LoL aquí y repetiré seguro, muy bien organizado.' },
  { id: 3, name: 'Diego M.', rating: 4, game: 'Valorant', comment: 'Buen precio por hora y los PCs van finos. Le quito una estrella porque los findes hay que reservar con antelación.' },
  { id: 4, name: 'Nerea P.', rating: 5, game: 'League of Legends', comment: 'El sistema de ranking y recompensas engancha muchísimo, siempre hay motivos para volver.' }
]

export const useReviews = () => {
  // TODO Supabase: SELECT * FROM reviews WHERE published = true ORDER BY created_at DESC LIMIT 8
  return useState('reviews', seedReviews)
}
