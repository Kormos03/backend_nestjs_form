import { Controller, Body, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user';
import { Response } from 'express';
import { packageDto } from './package.dto';

//const users: User[] = [new User('admin@example.com', 'asdf1234', 23,)];   //MVC-model view controller része a users tömb <- valszeg a vizsgában lesz ilyen kérdés

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };

  }

  @Get('packageReg')
  @Render('packageRegist')
  packageReg() {
    return {}
  }

  @Post('packageReg')
  @Render('packageRegist')
  packgeReg(@Body() pack: packageDto, @Res() res: Response) {
    console.log(pack)
    const errors: string[] = [];
    const regex = /^[a-zA-Z]{2}\d{4}$/;
    if (!pack.serial_number || !regex.test(pack.serial_number)) {
      console.log(pack.serial_number)
      errors.push('Serial number format is not correct!')
    }
    if (!pack.condition || (pack.condition !== 'perfect' && pack.condition !== 'damaged')) {
      errors.push('Condition has to be perfect or damaged!');
    }
    if (!pack.name || pack.name.length < 3 || pack.name.trim() === '') {
      errors.push('The name must contain at least 3 characters!');
    }
    console.log(errors)
    console.log(pack.serial_number.slice(0, 2))
    console.log(pack.serial_number.slice(2, 6))
    if (errors.length > 0) {
      return {
        errors,
      };
    } else {
      res.redirect('/');
    }
  }
}
/*
  @Get('register')  //Ezt kell beírni az URL-be hogy megkapjuk a register formot
  @Render('registerForm')
  registerForm() {
    return {}
  }

  @Post('register')
  @Render('registerForm')
  register(@Body() registration: registrationDto, @Res() res: Response): {} {
    console.log(registration)
    const errors: string[] = [];
    if (!registration.email.includes('@')) {
      errors.push('Az email cím formátuma nem megfelelő!');
    }
    if (registration.password.length < 8) {
      errors.push('A jelszó túl rövid!');
    }
    if (registration.password != registration.password_again) {
      errors.push('A jelszavak nem egyeznek!');
    }
    const age = registration.age;
    if (age < 18 || isNaN(age)) {
      errors.push('Az életkornak 18-nál nagyobb számnak kell lennie!');
    }
    if (errors.length > 0) {
      return {
        errors,
      };

    }
    else {
      // valódi alkalmazásban itt lenne a DB-be írás
      users.push(new User(registration.email, registration.password, registration.age));
      console.log(users);
      res.redirect('/');//Ha sikeres volt a regisztráció, akkor ezzel át irányítjuk a főoldalra   

    }
  }


}





/* <% errors.forEach((msg)=> { %>
            <p class="errorMessage">
                <%= msg %>
            </p>
            <% }); %> <input type="submit" value="Regist the package"> */ 