export abstract class FolioBuilder {
  private static readonly BASE_36_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  static build(): string {
    const _date = new Date();
    const _group = [FolioBuilder.toBase36(_date.getFullYear() % 100), FolioBuilder.toBase36(FolioBuilder.getDay(_date)), FolioBuilder.toBase36(_date.getHours()), FolioBuilder.toBase36(_date.getMinutes()), FolioBuilder.toBase36(_date.getSeconds()), FolioBuilder.toBase36(Math.floor(Math.random() * 36))];
    return _group.join('');
  }

  private static getDay(fecha: Date): number {
    const startOfYear = new Date(fecha.getFullYear(), 0, 1); // Cambiado a 1 para el 1 de enero
    const elapsedTime = fecha.getTime() - startOfYear.getTime();
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    return Math.floor(elapsedTime / millisecondsInADay) + 1;
  }

  private static toBase36(num: number): string {
    let result = '';
    do {
      result = FolioBuilder.BASE_36_CHARS[num % 36] + result;
      num = Math.floor(num / 36);
    } while (num > 0);
    return result;
  }
}
