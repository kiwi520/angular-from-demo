import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

  heroForm: FormGroup;

  payLoad = '';

  submitForm() {
    this.payLoad = JSON.stringify(this.heroForm.value);
    console.log(this.payLoad);
    if(this.payLoad){
      this.showConfirm("12313")
    }
  }



  public grades = [2011,2012,2013,2014,2015,2016,2017,2018];

  // model = new Hero('','', '','','');


  // get diagnostic () {
  //   return JSON.stringify(this.model)
  // }
  constructor(private fb: FormBuilder,private confirmServ: NzModalService) {
  }


  // 使用自定义验证
  ngOnInit() {
    this.heroForm = this.fb.group({
      email            : [ null, [ this.onEmailsChangeValidator] ],
      student         : [ null, [ this.onStudentIdValidator] ],
      name         : [ null, [ this.onNameValidator] ],
    });
  }

  getFormControl(name) {
    return this.heroForm.controls[ name ];
  }

  // 验证邮箱
  onEmailsChangeValidator = (control: FormControl): { [s: string]: boolean } => {
    if (control.value) {
      var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]){1,10}/;   /*定义验证表达式*/
      if(!reg.test(control.value)){
        return { error: true, email: true };
      }
    }
  };
  // 验证学号
  onStudentIdValidator = (control: FormControl): { [s: string]: boolean } => {
    if (control.value) {
      var reg=/^[0-9]{1,20}$/;   /*定义验证表达式*/
      if(!reg.test(control.value)){
        return { error: true, student: true };
      }
    }
  };
  // 验证姓名
  onNameValidator = (control: FormControl): { [s: string]: boolean } => {
    if (control.value) {
      var reg=/^[\u4E00-\u9FA5]{1,9}$/;  /*定义验证表达式*/
      if(!reg.test(control.value)){
        return { error: true, name: true };
      }
    }
  };

  onBlurMethod(str: string) {
    var reg=/^[\u4E00-\u9FA5]{1,9}$/;  /*定义验证表达式*/
    if(!reg.test(str) && str.length>0){
      this.confirmServ.confirm({
        title  : '友情提示',
        content: '<b>输入格式有误，请重新输入</b>',
        onOk() {
          console.log(str);
          console.log('确定');
        },
        onCancel() {
          console.log(str);
        }
      });
    }
  }


  showConfirm = (str: string) => {
    this.confirmServ.confirm({
      title  : '错误提示',
      content: '<b>'+str+'</b>',
      onOk() {
        console.log(str);
        console.log('确定');
      },
      onCancel() {
        console.log(str);
      }
    });
  }
}
