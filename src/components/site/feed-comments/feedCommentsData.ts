export interface Comment {
  id: string
  initial: string
  gradient: string
  name: string
  time: string
  text: string
  likes: number
  liked: boolean
  replyTo?: string
}

export const MOCK_COMMENTS: Comment[] = [
  {
    id: "1",
    initial: "Y", gradient: "linear-gradient(135deg,#2d6a4f,#52b788)",
    name: "Yuna", time: "1h atrás",
    text: "Concordo demais! O arco final foi pesado mas fazia sentido pra história do Eren.",
    likes: 12, liked: false,
  },
  {
    id: "2",
    initial: "M", gradient: "linear-gradient(135deg,#6930c3,#e63946)",
    name: "miyamoto_rei", time: "45min",
    text: "Exatamente. É um dos finais mais corajosos da história da mídia.",
    likes: 8, liked: true,
    replyTo: "yuuna",
  },
  {
    id: "3",
    initial: "L", gradient: "linear-gradient(135deg,#457b9d,#1d3557)",
    name: "luka_anime", time: "30min",
    text: "Assisti 3 vezes e ainda choro no mesmo lugar. Obra.",
    likes: 5, liked: false,
  },
]
