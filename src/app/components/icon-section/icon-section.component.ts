import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Layout, Database, Edit2 } from 'lucide-angular';
import { AutomationService } from '../../services/automation.service';

interface SystemIcon {
  id: 'slate' | 'erp';
  name: string;
  icon: any;
  bgColor: string;
  hoverColor: string;
}

@Component({
  selector: 'app-icon-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-6">System Access</h2>
      
      @if (error) {
        <div class="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center justify-between">
          <span>{{ error }}</span>
          <button 
            (click)="error = null" 
            class="text-red-700 hover:text-red-900"
          >
            <Edit2 class="h-4 w-4" />
          </button>
        </div>
      }

      <div class="grid grid-cols-2 gap-6">
        @for (system of systems; track system.id) {
          <div class="relative">
            <button
              (click)="handleSystemClick(system.id)"
              [disabled]="isLoading"
              [class]="'w-full h-32 ' + system.bgColor + ' ' + 
                (isLoading ? 'opacity-75 cursor-not-allowed' : system.hoverColor) + 
                ' text-white rounded-lg transition-all duration-200 flex flex-col items-center justify-center space-y-2'"
            >
              @if (isLoading && activeSystem === system.id) {
                <div class="flex flex-col items-center space-y-2">
                  <div class="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent"></div>
                  <span class="text-sm">Starting automation...</span>
                </div>
              } @else {
                <div [ngSwitch]="system.id">
                  @case ('slate') {
                    <Layout class="h-8 w-8" />
                  }
                  @case ('erp') {
                    <Database class="h-8 w-8" />
                  }
                </div>
                <span class="font-semibold">{{ system.name }}</span>
              }
            </button>
          </div>
        }
      </div>
    </div>
  `
})
export class IconSectionComponent {
  systems: SystemIcon[] = [
    {
      id: 'slate',
      name: 'Slate',
      icon: Layout,
      bgColor: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-500'
    },
    {
      id: 'erp',
      name: 'ERP UoL',
      icon: Database,
      bgColor: 'bg-green-600',
      hoverColor: 'hover:bg-green-500'
    }
  ];

  isLoading = false;
  activeSystem: 'slate' | 'erp' | null = null;
  error: string | null = null;

  constructor(private automationService: AutomationService) {}

  handleSystemClick(systemId: 'slate' | 'erp') {
    if (this.isLoading) return;

    this.isLoading = true;
    this.activeSystem = systemId;
    this.error = null;

    this.automationService.startAutomation(systemId).subscribe({
      next: (response) => {
        console.log(`${systemId} automation started:`, response);
      },
      error: (err) => {
        this.error = err.error?.error || 'Failed to start automation. Please try again.';
        this.isLoading = false;
        this.activeSystem = null;
      },
      complete: () => {
        this.isLoading = false;
        this.activeSystem = null;
      }
    });
  }
}