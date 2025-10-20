import { Component } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

interface FormField {
  type: string;
  label: string;
  required: boolean;
  options?: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  availableFields: FormField[] = [
    { type: 'text', label: 'Text Input', required: false },
    { type: 'textarea', label: 'Textarea', required: false },
    { type: 'checkbox', label: 'Checkbox', required: false },
    { type: 'radio', label: 'Radio Buttons', required: false, options: ['Option 1', 'Option 2'] },
    { type: 'select', label: 'Dropdown', required: false, options: ['Option 1', 'Option 2'] }
  ];

  formFields: FormField[] = [];
  selectedFieldIndex: number | null = null;

  updateOptionsFromEvent(field: FormField, event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.updateOptions(field, value);
  }
  
  drop(event: CdkDragDrop<FormField[]>) {
    const field = event.previousContainer.data[event.previousIndex];
    const newField = JSON.parse(JSON.stringify(field));
    this.formFields.push(newField);
  }

  selectField(index: number) {
    this.selectedFieldIndex = index;
  }

  get selectedField(): FormField | null {
    return this.selectedFieldIndex !== null ? this.formFields[this.selectedFieldIndex] : null;
  }

  updateOptions(field: FormField, value: string) {
    field.options = value
      ? value.split(',').map(o => o.trim())
      : [];
  }

  exportJSON() {
    const json = JSON.stringify(this.formFields, null, 2);
    alert('Exported JSON:\n' + json);
  }

  handleJsonImport(event: Event): void {
    const input = event.target as HTMLInputElement;
  
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
  
      const reader = new FileReader();
  
      reader.onload = () => {
        try {
          debugger;
          const jsonData = JSON.parse(reader.result as string);
  
          // 👇 Update your form builder data here
          this.formFields = jsonData.formFields || [];
  
          console.log('Imported form data:', this.formFields);
        } catch (error) {
          console.error('Invalid JSON file:', error);
          alert('Failed to import: Invalid JSON format.');
        }
      };
  
      reader.readAsText(file);
    }
  }
}
