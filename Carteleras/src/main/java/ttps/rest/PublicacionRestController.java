package ttps.rest;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import ttps.clases.Alumno;
import ttps.clases.Comentario;
import ttps.clases.Persona;
import ttps.clases.Publicacion;
import ttps.interfacesDAO.ComentarioDAO;
import ttps.interfacesDAO.PersonaDAO;
import ttps.interfacesDAO.PublicacionDAO;

@CrossOrigin
@RestController
@RequestMapping(value = "/Publicaciones")
public class PublicacionRestController {
	
	@Autowired
	private PublicacionDAO publicacionDAO;
	
	@Autowired
	private ComentarioDAO comentarioDAO;
	
	@Autowired
	private PersonaDAO usuarioDAO;
	
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<Publicacion>> listarPublicaciones() {
	    //List<Publicacion> publicaciones = publicacionDAO.obtenerTodos();
		List<Publicacion> publicaciones = publicacionDAO.obtenerTodasLasPublicaciones();
	    if(publicaciones.isEmpty()){
	    	return new ResponseEntity<List<Publicacion>>(HttpStatus.NO_CONTENT); 
    	}
	    //return new ResponseEntity<List<Publicacion>>(publicaciones, HttpStatus.OK);
	    return new ResponseEntity<List<Publicacion>>(publicaciones,HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)    
	public ResponseEntity<Publicacion> listarPublicacion(@PathVariable("id") long id) {
		Publicacion publicacion = publicacionDAO.obtenerPublicacion(id);
		if (publicacion == null) { 
			return new ResponseEntity<Publicacion>(HttpStatus.NOT_FOUND);
		}
        return new ResponseEntity<Publicacion>(publicacion, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/Comentarios/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)    
	public ResponseEntity<List<Comentario>> listarComentarios(@PathVariable("id") long id) {
		List<Comentario> comentarios = publicacionDAO.obtenerComentarios(id);
		if (comentarios == null) { 
			return new ResponseEntity<List<Comentario>>(HttpStatus.NOT_FOUND);
		}
        return new ResponseEntity<List<Comentario>>(comentarios, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/Comentarios/{id}", method = RequestMethod.POST)    
	public ResponseEntity<Void> agregarComentario(@RequestBody Comentario comentario) {
		comentarioDAO.guardar(comentario);
		return new ResponseEntity<Void>(HttpStatus.CREATED); 
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Void> crearPublicacion(@RequestBody Publicacion publicacion, UriComponentsBuilder ucBuilder){
		publicacionDAO.guardar(publicacion);
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/publicaciones/{id}").buildAndExpand(publicacion.getId()).toUri());
		
		return new ResponseEntity<Void>(headers, HttpStatus.CREATED); 
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Publicacion> actualizarPublicacion(@PathVariable("id") long id, @RequestBody Publicacion publicacion) {
		Publicacion actual = publicacionDAO.obtener(id);
		if (actual == null) {
			return new ResponseEntity<Publicacion>(HttpStatus.NOT_FOUND);
		}
		actual.setComentarios(publicacion.getComentarios());
		actual.setDescripcion(publicacion.getDescripcion());
		actual.setTieneArchivo(publicacion.getTieneArchivo());
		actual.setAceptaComentarios(publicacion.getAceptaComentarios());
		actual.setMultimedia(publicacion.getMultimedia());
		actual.setTitulo(publicacion.getTitulo());
		publicacionDAO.modificar(actual);
		return new ResponseEntity<Publicacion>(actual, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)    
	public ResponseEntity<Publicacion> eliminarPublicacion(@PathVariable("id") long id) {
        Publicacion publicacion = publicacionDAO.obtener(id);
        if (publicacion == null) {
        	return new ResponseEntity<Publicacion>(HttpStatus.NOT_FOUND);
    	}
 
        publicacionDAO.remover(id);
        return new ResponseEntity<Publicacion>(HttpStatus.NO_CONTENT);
    }
}
