import { Component, OnInit } from '@angular/core';
import { Estudiante } from './../models/estudiante';
import { EstudianteService } from '../services/estudiante.service';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import {AuthService} from '../services/auth.service'

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  public students: Estudiante[];
  public student: String;

  constructor(
    private service:EstudianteService, 
    public alertCtrl: AlertController, 
    private navCtrl: NavController,
    private router: Router,
    private auth: AuthService,
    private afAuth: AngularFireAuth) {
    this.service.getStudents().subscribe(data => {
      this.students = data.map(e => {
        return {
          id: e.payload.doc.id,...e.payload.doc.data() as Estudiante
        } 
      })
    });
    this.student = "todos"
  }

  ngOnInit() {
  }

  showAlert(curp,edad) {
    this.alertCtrl.create({
      header: 'Información',
      message: 'CURP: '+curp+'<br/>'+'EDAD: '+edad,
      buttons: ['OK']
    }).then(res => {
      res.present();
    });
  }

  edit(student){
    this.navCtrl.navigateForward(['/update/', student.id]);
  }

  detail(student: Estudiante){
    let navext: NavigationExtras = {
      queryParams:{
        special: JSON.stringify(student)
      }
    };
    this.router.navigate(['/detail'], navext);
  }

  onLogout(){
    console.log('Logout');
    this.afAuth.signOut();
    this.router.navigateByUrl('/login');
  }
  
}
