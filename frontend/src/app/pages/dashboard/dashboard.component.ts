import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LeadService } from '../../services/lead.service';
import { CandidateService } from '../../services/candidate.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  leads: any[] = [];
  candidates: any[] = [];

  leadSearch = '';
  leadPriorityFilter = '';

  candidateSearch = '';
  candidateRecommendationFilter = '';

  totalLeads = 0;
  totalCandidates = 0;

  hotLeads = 0;
  mediumLeads = 0;
  lowLeads = 0;

  shortlistedCandidates = 0;
  reviewCandidates = 0;
  rejectedCandidates = 0;

  constructor(
    private leadService: LeadService,
    private candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    this.loadLeads();
    this.loadCandidates();
  }

  loadLeads() {
    this.leadService.getLeads().subscribe({
      next: (response: any) => {
        this.leads = response.data;

        this.totalLeads = this.leads.length;
        this.hotLeads = this.leads.filter((lead) => lead.priority === 'High').length;
        this.mediumLeads = this.leads.filter((lead) => lead.priority === 'Medium').length;
        this.lowLeads = this.leads.filter((lead) => lead.priority === 'Low').length;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  loadCandidates() {
    this.candidateService.getCandidates().subscribe({
      next: (response: any) => {
        this.candidates = response.data;

        this.totalCandidates = this.candidates.length;
        this.shortlistedCandidates = this.candidates.filter(
          (candidate) => candidate.recommendation === 'Shortlist'
        ).length;
        this.reviewCandidates = this.candidates.filter(
          (candidate) => candidate.recommendation === 'Review'
        ).length;
        this.rejectedCandidates = this.candidates.filter(
          (candidate) => candidate.recommendation === 'Reject'
        ).length;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getLeadPercentage(count: number): number {
    if (this.totalLeads === 0) return 0;
    return Math.round((count / this.totalLeads) * 100);
  }

  getCandidatePercentage(count: number): number {
    if (this.totalCandidates === 0) return 0;
    return Math.round((count / this.totalCandidates) * 100);
  }

  get filteredLeads() {
    return this.leads.filter((lead) => {
      const searchText = this.leadSearch.toLowerCase();

      const matchesSearch =
        lead.name.toLowerCase().includes(searchText) ||
        lead.company.toLowerCase().includes(searchText) ||
        lead.industry.toLowerCase().includes(searchText);

      const matchesPriority =
        this.leadPriorityFilter === '' ||
        lead.priority === this.leadPriorityFilter;

      return matchesSearch && matchesPriority;
    });
  }

  get filteredCandidates() {
    return this.candidates.filter((candidate) => {
      const searchText = this.candidateSearch.toLowerCase();

      const matchesSearch =
        candidate.fullName.toLowerCase().includes(searchText) ||
        candidate.position.toLowerCase().includes(searchText);

      const matchesRecommendation =
        this.candidateRecommendationFilter === '' ||
        candidate.recommendation === this.candidateRecommendationFilter;

      return matchesSearch && matchesRecommendation;
    });
  }
}