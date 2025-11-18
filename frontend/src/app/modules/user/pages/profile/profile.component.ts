import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/admin/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  editing = false;
  saving = false;
  avatarFile: File | null = null;
  avatarPreview: string | null = null;
  defaultAvatar = 'https://i.ibb.co/9s0Yc1s/default-avatar.png';
  loading = false;
  profile: any = null;


  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    mobileNumber: ['', []],
    bio: ['']
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  get fc() { return this.form.controls; }

  loadProfile() {
    this.loading = true;

    this.userService.getMyProfile().subscribe({
      next: (res) => {
        this.profile = res;

        this.form.patchValue({
          username: res.username,
          email: res.email,
          mobileNumber: res.mobileNumber,
          bio: res.bio
        });
      },
      error: () => this.snack.open('Failed to load profile', 'Close', { duration: 3000 }),
      complete: () => this.loading = false
    });
  }


  startEdit() {
    this.editing = true;
  }

  cancel() {
    this.editing = false;
    this.avatarPreview = null;
    this.avatarFile = null;
    this.form.patchValue({
      username: this.user.username,
      email: this.user.email,
      mobileNumber: this.user.mobileNumber,
      bio: this.user.bio || ''
    });
  }

  onFileSelected(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    if (!file.type.startsWith('image/')) {
      this.snack.open('Please select an image file', 'Close', { duration: 2000 });
      return;
    }
    this.avatarFile = file;
    const reader = new FileReader();
    reader.onload = () => this.avatarPreview = String(reader.result);
    reader.readAsDataURL(file);
  }

  removeAvatar() {
    this.avatarFile = null;
    this.avatarPreview = null;
  }

  onSave() {
    this.saving = true;

    let payload: any;

    if (this.avatarFile) {
      payload = new FormData();
      payload.append('username', String(this.form.value.username ?? ''));
      payload.append('email', String(this.form.value.email ?? ''));
      payload.append('mobileNumber', String(this.form.value.mobileNumber ?? ''));
      payload.append('bio', String(this.form.value.bio ?? ''));
      payload.append('avatar', this.avatarFile, this.avatarFile.name);
    } else {
      payload = {
        username: String(this.form.value.username ?? ''),
        email: String(this.form.value.email ?? ''),
        mobileNumber: String(this.form.value.mobileNumber ?? ''),
        bio: String(this.form.value.bio ?? '')
      };
    }

    this.userService.updateMyProfile(payload).subscribe({
      next: () => {
        this.snack.open('Profile updated', 'OK', { duration: 2000 });
        this.editing = false;
        this.avatarFile = null;
        this.avatarPreview = null;

        // Reload updated profile
        this.loadProfile();
      },
      error: () => {
        this.snack.open('Update failed', 'Close', { duration: 3000 });
      },
      complete: () => {
        this.saving = false;
      }
    });
  }


  openChangePassword() {
    // navigate to or open a dialog for change password flow
    this.router.navigate(['/user/change-password']);
  }
}
