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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UppercaseDirective } from '../../directives/uppercase.directive';
import { CommonModule } from '@angular/common';
import { switchMap, of, map } from 'rxjs';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    CommonModule,
    UppercaseDirective,
    MatButtonModule,
    FormsModule,
  ],
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
    this.route.paramMap
      .pipe(
        map((params) => Number(params.get('id'))),
        switchMap((id) => (id ? of(this.heroService.getHeroById(id)) : of(null)))
      )
      .subscribe((hero) => {
        if (hero) {
          this.heroForm.patchValue(hero);
          this.heroId = hero.id;
        }
      });
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
