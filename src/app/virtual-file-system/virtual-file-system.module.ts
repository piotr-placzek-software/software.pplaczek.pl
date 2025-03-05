import { NgModule } from '@angular/core';
import { VirtualFileSystemService } from './services/virtual-file-system.service';

@NgModule({
  providers: [VirtualFileSystemService],
})
export class VirtualFileSystemModule {}
