import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[dnd]',
  standalone: true
})
// Делаем директиву, чтобы можно было перетаскивать (Называется Drag And Drop/Drag'n'drop) фотку в инпут аватарки 
export class DndDirective {

  // есть куча стандартных событий, которые можно слушать, например, click, keyup и т.д.
  // как сделать своё:
  @Output() fileDropped = new EventEmitter<File>();

  @HostBinding('class.fileover')
  fileover = false; // что это значит: когда fileover будет true, к элементу, на который мы повесили директиву dnd, будет добавляться класс fileover

  // HostListener - альтернатива AddEventListener; 
  // параметры HostListener: event, который слушаем, и массив параметров, которые передадим в функцию (не в общем виде, как при инициализации функции, а конкретные, как при вызове)
  // но HostListener - декоратор; здесь он декорирует функцию onDragOver

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    // console.log(event); // можем вывести посмотреть

    this.fileover = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileover = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileover = false;

    this.fileDropped.emit(event.dataTransfer?.files[0]); 
    // у EventEmmiter есть только метод emit

    // слушатель события fileDropped надо будет так же, как для обычного события, повесить на элемент, на который мы вешали dnd (то есть на дропзону)
  }

}
