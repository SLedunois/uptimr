export type IMonitor = {
    id: string,
    cron: string,
    target: string,
    name: string,
    owner: string,
    uptime: string,
    lastCheck: string,
    status: 'WAITING' | 'SUCCESS' | 'ERROR'
}