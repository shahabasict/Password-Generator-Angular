import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClipboardModule,Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [FormsModule,CommonModule,ClipboardModule],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.css'
})
export class GeneratorComponent {


generatedPassword:string = '';
passwordLength:number=10;
passwordStrength: number=0;
includeUppercase:Boolean = true;
includeLowercase:Boolean = true;
includeNumbers:Boolean = true;
includeSymbols:Boolean = true;

generatePassword() {
  const UpperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerChars = 'abcdefgjhijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbols = '!@#$%^&*()_+<>?{}~';

  let  password = '';
  if(this.includeUppercase) password +=  UpperChars;
  if(this.includeLowercase) password +=  lowerChars;
  if(this.includeNumbers) password +=   numberChars;
  if(this.includeSymbols) password +=   symbols;

  this.generatedPassword = Array.from({length : this.passwordLength})
    .map(()=>password.charAt(Math.floor(Math.random()*password.length)))
    .join('');

    this.calculateStrength()


}
  calculateStrength() {
    this.passwordStrength = 0;
    if (this.includeUppercase) this.passwordStrength++;
    if (this.includeLowercase) this.passwordStrength++;
    if (this.includeNumbers) this.passwordStrength++;
    if (this.includeSymbols) this.passwordStrength++;

    if (this.generatedPassword.length >= 12) {
      this.passwordStrength++;
    }

  }

  constructor(private clipboard: Clipboard) {}

  
    
  
copyToClipboard(): void {
  this.clipboard.copy(this.generatedPassword);
}
  


}
