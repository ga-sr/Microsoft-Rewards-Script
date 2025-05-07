import { loadConfig } from './Load'
import axios from 'axios'

const NOTIFICATION_TYPES = {
  error: { emoji: '❌' },
  warn: { emoji: '🚨' },
  log: { emoji: '✅' }
}

export async function DiscordNotification(message: string, type: keyof typeof NOTIFICATION_TYPES = 'log'): Promise<void> {
  const config = loadConfig().discord
  if (!config?.enabled || !config.webhook) return

  try {
    const { emoji } = NOTIFICATION_TYPES[type]
    const headers = {
      "Content-Type": "application/json"
    }

    const response = await axios.post(`${config.webhook}`, {
      content: `${emoji} ${message}`
    }, { headers })

    if (response.status === 204) {
      console.log('Discord notification successfully sent.')
    } else {
      console.error(`Discord notification failed with status ${response.status}`)
    }
  } catch (error) {
    console.error('Failed to send Discord notification:', error)
  }
}