import { useSyncExternalStore } from "react"

// Chave para salvar no localStorage
const STORAGE_KEY = "animely:rightPanelExpanded"

// Inicializa a partir do localStorage apenas uma vez (quando o arquivo é carregado)
let isExpandedGlobal = true
try {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved !== null) {
    isExpandedGlobal = saved === "true"
  }
} catch {
  // Falha silenciosa caso localStorage não esteja disponível
}

const listeners = new Set<() => void>()

export function setRightPanelExpanded(value: boolean | ((prev: boolean) => boolean)) {
  const nextValue = typeof value === "function" ? value(isExpandedGlobal) : value
  isExpandedGlobal = nextValue
  listeners.forEach(listener => listener())

  const saveToStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY, String(nextValue))
    } catch {}
  }

  if (typeof requestIdleCallback !== "undefined") {
    requestIdleCallback(saveToStorage)
  } else {
    setTimeout(saveToStorage, 0)
  }
}

function subscribe(callback: () => void) {
  listeners.add(callback)
  return () => {
    listeners.delete(callback)
  }
}

function getSnapshot() {
  return isExpandedGlobal
}

function getServerSnapshot() {
  return true
}

export function useRightPanelState() {
  const isExpanded = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  return [isExpanded, setRightPanelExpanded] as const
}
