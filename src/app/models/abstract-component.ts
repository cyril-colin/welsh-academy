import { Subject } from 'rxjs';

export class AbstractComponent {
    protected destroy$ = new Subject<void>();

    protected triggerDestroy$(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}