export type IMonitor = {
    id: string,
    cron: string,
    target: string,
    name: string,
    owner: string,
    status: 'WAITING' | 'SUCCESS' | 'ERROR'
}