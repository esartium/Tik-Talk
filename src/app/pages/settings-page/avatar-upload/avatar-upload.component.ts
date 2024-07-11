import { Component, signal } from '@angular/core';
import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';
import { DndDirective } from '../../../common-ui/dnd.directive';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [SvgIconComponent, DndDirective],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent {
  preview = signal<string>('/assets/images/avatar-placeholder.svg');

  avatar: File | null = null;

  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.processFile(file);
  }

  onFileDropped(file: File) { 
    // почему тут file: File, а не event (хотя из слушателя в компоненте мы передали $event):
    // потому что в директиве dnd мы прописали, что у ивента fileDropped тип File.
    
    this.processFile(file);
  }

  processFile(file: File | null | undefined) {
    if (!file || !file.type.match('image')) return;

    const reader = new FileReader;
    reader.onload = event => {
      this.preview.set(event.target?.result?.toString() ?? ''); // сделали проверку ??, так как ангуляр ругался, что не может string быть string|undefined
    }

    reader.readAsDataURL(file);

    this.avatar = file;
  }
}
