package ttps.rest;

import java.util.Date;
import java.util.List;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ttps.clases.Administrador;
import ttps.clases.Alumno;
import ttps.clases.Cartelera;
import ttps.clases.Comentario;
import ttps.clases.Profesor;
import ttps.clases.Publicacion;
import ttps.clases.Publicador;
import ttps.interfacesDAO.AdministradorDAO;
import ttps.interfacesDAO.AlumnoDAO;
import ttps.interfacesDAO.CarteleraDAO;
import ttps.interfacesDAO.ComentarioDAO;
import ttps.interfacesDAO.ProfesorDAO;
import ttps.interfacesDAO.PublicacionDAO;
import ttps.interfacesDAO.PublicadorDAO;

@RestController
@RequestMapping(value = "/Prueba")
public class PruebaRestController {
	@Autowired
	private CarteleraDAO carteleraDAO;
	@Autowired
	private AdministradorDAO administradorDAO;
	@Autowired
	private AlumnoDAO alumnoDAO;
	@Autowired
	private ProfesorDAO profesorDAO;
	@Autowired
	private PublicadorDAO publicadorDAO;
	@Autowired
	private PublicacionDAO publicacionDAO;
	@Autowired
	private ComentarioDAO comentarioDAO;
	
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<Void> listarCarteleras() {
		//Creamos las carteleras
		Cartelera c = new Cartelera("Ingresantes", new Date());
		Cartelera c1 = new Cartelera("Primer año", new Date());
		Cartelera c2 = new Cartelera("Segundo año", new Date());
		Cartelera c3 = new Cartelera("Tercer año", new Date());
		Cartelera c4 = new Cartelera("Cuarto año", new Date());
		Cartelera c5 = new Cartelera("Quinto año", new Date());
		Cartelera c6 = new Cartelera("Institucional", new Date());
		Cartelera c7 = new Cartelera("Eventos", new Date());
		Cartelera c8 = new Cartelera("Ofrecimientos laborales", new Date());
		
		guardarCarteleras(c,c1,c2,c3,c4,c5,c6,c7,c8,carteleraDAO);
		
		//AdministradorDAO aDAO = context.getBean(AdministradorDAO.class);
		
		//Creamos administradores
		Administrador a1 = new Administrador("Facundo","Oreja",new Date(),30123456,"admin1@admin.com",1,"admin1","admin");
		Administrador a2 = new Administrador("Viejo","Cuida Bici",new Date(),30123456,"admin2@admin.com",1,"admin2","admin");
		Administrador a3 = new Administrador("John","Maddog",new Date(),30123456,"admin3@admin.com",1,"admin3","admin");
		
		guardarAdministradores(a1,a2,a3,administradorDAO);
		
		//AlumnoDAO alDAO = context.getBean(AlumnoDAO.class);
		
		//Creamos alumnos
		Alumno al1= new Alumno("Maximiliano","Mendivil",new Date(2,1,1993),36734753,"maximendivil22@gmail.com",3,"maximendivil","123","11982/1");
		Alumno al2= new Alumno("Ezequiel","Ringuelet",new Date(21,9,1993),123456,"ezeringue@gmail.com",3,"ezeringue","123","12000/1");
		Alumno al3= new Alumno("Luciano","La Frazia",new Date(),321654,"ellucho@gmail.com",3,"lucholafrazia","123","11900/1");
		
		guardarAlumnos(al1,al2,al3,alumnoDAO);
		
		//ProfesorDAO pDAO = context.getBean(ProfesorDAO.class);
		
		//Creamos Profesores
		Profesor p1 = new Profesor("Laura","Fava",new Date(),12345678,"laurafava@gmail.com",2,"laurafava","123");
		Profesor p2 = new Profesor("Gustavo","Rossi",new Date(),12345678,"gustavorossi@gmail.com",2,"grossi","123");
		Profesor p3 = new Profesor("Juan Pablo","Perez",new Date(),12345678,"jppez@gmail.com",2,"jpperez","123");
		
		guardarProfesores(p1,p2,p3,profesorDAO);
		
		//PublicadorDAO puDAO = context.getBean(PublicadorDAO.class);
		
		//Creamos Publicadores
		Publicador pu1 = new Publicador("Publicador","1",new Date(),12345678,"publicador1@gmail.com",4,"publicador1","123");
		Publicador pu2 = new Publicador("Publicador","2",new Date(),12345678,"publicador2@gmail.com",4,"publicador2","123");
		Publicador pu3 = new Publicador("Publicador","3",new Date(),12345678,"publicador3@gmail.com",4,"publicador3","123");
		
		guardarPublicadores(pu1,pu2,pu3,publicadorDAO);
		
		//PublicacionDAO publicacionDAO = context.getBean(PublicacionDAO.class);
		
		//Creamos las publicaciones
		Publicacion publicacion = new Publicacion("Prueba","Es una prueba","casa",new Date(),p1);
		publicacion.setCartelera(c);
		Publicacion publicacion2 = new Publicacion("Prueba2","Es una prueba","casa",new Date(),p2);
		publicacion2.setCartelera(c1);
		Publicacion publicacion3 = new Publicacion("Prueba3","Es una prueba","casa",new Date(),p3);
		publicacion3.setCartelera(c2);
		Publicacion publicacion4 = new Publicacion("Prueba4","Es una prueba","casa",new Date(),pu1);
		publicacion4.setCartelera(c3);
		Publicacion publicacion5 = new Publicacion("Prueba5","Es una prueba","casa",new Date(),pu2);
		publicacion5.setCartelera(c4);
		Publicacion publicacion6 = new Publicacion("Prueba6","Es una prueba","casa",new Date(),pu3);
		publicacion6.setCartelera(c5);
		
		guardarPublicaciones(publicacion,publicacion2,publicacion3,publicacion4,publicacion5,publicacion6,publicacionDAO);
		
		//ComentarioDAO coDAO = context.getBean(ComentarioDAO.class);
		
		//Creamos comentarios
		Comentario co1 = new Comentario("Comentario 1",new Date(),al1);
		co1.setPublicacion(publicacion);		
		Comentario co2 = new Comentario("Comentario 2",new Date(),al2);
		co2.setPublicacion(publicacion2);
		Comentario co3 = new Comentario("Comentario 3",new Date(),al3);
		co3.setPublicacion(publicacion3);
		Comentario co4 = new Comentario("Comentario 4",new Date(),p1);
		co4.setPublicacion(publicacion4);
		Comentario co5 = new Comentario("Comentario 5",new Date(),p2);
		co5.setPublicacion(publicacion5);
		Comentario co6 = new Comentario("Comentario 6",new Date(),pu1);
		co6.setPublicacion(publicacion6);
		
		guardarComentarios(co1,co2,co3,co4,co5,co6,comentarioDAO);
		
		
	    return new ResponseEntity<Void>(HttpStatus.OK);

	}
	
	private void guardarCarteleras(Cartelera c, Cartelera c1, Cartelera c2, Cartelera c3, Cartelera c4, Cartelera c5, Cartelera c6, Cartelera c7, Cartelera c8, CarteleraDAO cDAO){
		try {
			c = cDAO.guardar(c);
			c1 = cDAO.guardar(c1);
			c2 = cDAO.guardar(c2);
			c3 = cDAO.guardar(c3);
			c4 = cDAO.guardar(c4);
			c5 = cDAO.guardar(c5);
			c6 = cDAO.guardar(c6);
			c7 = cDAO.guardar(c7);
			c8 = cDAO.guardar(c8);
			System.out.println("Se guardaron las carteleras correctamente");
		}
		catch (Exception e){
			System.out.println(e.getMessage());
		}
	}
	
	private void guardarPublicaciones(Publicacion p1, Publicacion p2, Publicacion p3, Publicacion p4, Publicacion p5, Publicacion p6, PublicacionDAO publicacionDAO){
		try {
			p1 = publicacionDAO.guardar(p1);
			p2 = publicacionDAO.guardar(p2);
			p3 = publicacionDAO.guardar(p3);
			p4 = publicacionDAO.guardar(p4);
			p5 = publicacionDAO.guardar(p5);
			p6 = publicacionDAO.guardar(p6);
			System.out.println("Se guardaron las publicaciones correctamente");
		}
		catch (Exception e){
			System.out.println(e.getMessage());
		}
	}
	
	private void guardarComentarios(Comentario co1, Comentario co2, Comentario co3, Comentario co4, Comentario co5, Comentario co6, ComentarioDAO coDAO){
		try {
			co1 = coDAO.guardar(co1);
			co2 = coDAO.guardar(co2);
			co3 = coDAO.guardar(co3);
			co4 = coDAO.guardar(co4);
			co5 = coDAO.guardar(co5);
			co6 = coDAO.guardar(co6);
			System.out.println("Se guardaron los comentarios correctamente");
		}
		catch(Exception e){
			System.out.println(e.getMessage());
		}
	}
	private void guardarAdministradores(Administrador a1, Administrador a2, Administrador a3, AdministradorDAO aDAO){
		try {
			a1 = aDAO.guardar(a1);
			a2 = aDAO.guardar(a2);
			a3 = aDAO.guardar(a3);
			System.out.println("Se guardaron los administradores correctamente");
		}
		catch (Exception e){
			System.out.println(e.getMessage());
		}
	}
	
	private void guardarAlumnos(Alumno a1, Alumno a2, Alumno a3, AlumnoDAO alDAO){
		try {
			a1 = alDAO.guardar(a1);
			a2 = alDAO.guardar(a2);
			a3 = alDAO.guardar(a3);
			System.out.println("Se guardaron los alumnos correctamente");
		}
		catch (Exception e){
			System.out.println(e.getMessage());
		}
	}
	
	private void guardarProfesores(Profesor p1, Profesor p2, Profesor p3, ProfesorDAO pDAO){
		try {
			p1 = pDAO.guardar(p1);
			p2 = pDAO.guardar(p2);
			p3 = pDAO.guardar(p3);
			System.out.println("Se guardaron los profesores correctamente");
		}
		catch (Exception e){
			System.out.println(e.getMessage());
		}
	}
	
	private void guardarPublicadores(Publicador p1, Publicador p2, Publicador p3, PublicadorDAO puDAO){
		try {
			p1 = puDAO.guardar(p1);
			p2 = puDAO.guardar(p2);
			p3 = puDAO.guardar(p3);
			System.out.println("Se guardaron los publicadores correctamente");
		}
		catch (Exception e){
			System.out.println(e.getMessage());
		}
	}
}
