import { SafeResourceUrl } from "@angular/platform-browser";

export interface Video {
    id: string;
    name: string;
    safeUrl: SafeResourceUrl;
}