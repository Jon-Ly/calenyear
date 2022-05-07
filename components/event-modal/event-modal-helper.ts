export function IsNullOrEmpty(input?: string): boolean {
    return !!(input && input?.trim() === '')
}