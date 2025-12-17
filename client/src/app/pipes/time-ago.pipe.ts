import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeAgo', standalone: true })
export class TimeAgoPipe implements PipeTransform {
    transform(value: string | Date | null | undefined): string {
        if (!value) return '';
        const d = typeof value === 'string' ? new Date(value) : value;
        const diffMs = Date.now() - d.getTime();

        const sec = Math.floor(diffMs / 1000);
        if (sec < 60) return `${sec}s`;

        const min = Math.floor(sec / 60);
        if (min < 60) return `${min}m`;

        const hr = Math.floor(min / 60);
        if (hr < 24) return `${hr}h`;

        const day = Math.floor(hr / 24);
        if (day < 7) return `${day}d`;

        const week = Math.floor(day / 7);
        if (week < 4) return `${week}w`;

        const month = Math.floor(day / 30);
        if (month < 12) return `${month}mo`;

        const year = Math.floor(day / 365);
        return `${year}y`;
    }
}
