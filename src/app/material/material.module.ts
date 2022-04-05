import { NgModule } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { DialogDeleteElementComponent } from './dialog-delete-element/dialog-delete-element.component';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';


const materialComponent = [
  MatStepperModule,
  MatFormFieldModule, 
  MatMenuModule,
  MatDialogModule,
  MatIconModule,
  MatButtonModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatTabsModule,
  MatInputModule,
  MatTableModule
]

@NgModule({
  declarations: [
    DialogDeleteElementComponent,
  ],
  imports: [
    materialComponent
  ],
  exports: [
    materialComponent
  ],
})
export class MaterialModule { }
