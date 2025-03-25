import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Hero, HeroService } from '../../services/hero.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class HeroFormComponent implements OnInit {
  heroForm: FormGroup;
  heroId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private heroService: HeroService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.heroForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.heroId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.heroId) {
      const hero = this.heroService.getHeroById(this.heroId);
      if (hero) {
        this.heroForm.patchValue(hero);
      }
    }
  }

  saveHero(): void {
    if (this.heroForm.valid) {
      const hero: Hero = { id: this.heroId || 0, ...this.heroForm.value };
      if (this.heroId) {
        this.heroService.updateHero(hero);
      } else {
        this.heroService.addHero(hero);
      }
      this.router.navigate(['/heroes']);
    }
  }
}
