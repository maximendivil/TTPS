package ttps.rest;

import java.util.List;

import org.json.JSONObject;
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

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import ttps.clases.Alumno;
import ttps.clases.Cartelera;
import ttps.clases.Publicacion;
import ttps.interfacesDAO.CarteleraDAO;
import ttps.interfacesDAO.PublicacionDAO;

@CrossOrigin
@RestController
@RequestMapping(value = "/Carteleras")
public class CarteleraRestController {
	
	@Autowired
	private CarteleraDAO carteleraDAO;
	@Autowired
	private PublicacionDAO publicacionDAO;
	
	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<List<Cartelera>> listarCarteleras() {
	    List<Cartelera> carteleras = carteleraDAO.obtenerCarteleras();
	    return new ResponseEntity<List<Cartelera>>(carteleras,HttpStatus.OK);
	}
	
	@RequestMapping(value="/Habilitadas/{idPublicador}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<List<Cartelera>> listarCarteleras(@PathVariable("idPublicador") long idPublicador) {
	    List<Cartelera> carteleras = carteleraDAO.obtenerCartelerasHabilitadas(idPublicador);
	    return new ResponseEntity<List<Cartelera>>(carteleras,HttpStatus.OK);
	}
	
	@RequestMapping(value = "/Publicaciones/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)    
	public ResponseEntity<List<Publicacion>> listarPublicacionesCartelera(@PathVariable("id") long id) {
		List<Publicacion> publicaciones = carteleraDAO.obtenerPublicaciones(id);
		if (publicaciones == null) { 
			return new ResponseEntity<List<Publicacion>>(HttpStatus.NOT_FOUND);
		}
        return new ResponseEntity<List<Publicacion>>(publicaciones, HttpStatus.OK);
	}
	
	@RequestMapping(value = "{id}/Publicaciones/{idPublicador}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)    
	public ResponseEntity<List<Publicacion>> listarPublicacionesDeUnPublicador(@PathVariable("id") long id, @PathVariable("idPublicador") long idPublicador) {
		List<Publicacion> publicaciones = carteleraDAO.obtenerPublicacionesDeUnPublicador(id, idPublicador);
		if (publicaciones == null) { 
			return new ResponseEntity<List<Publicacion>>(HttpStatus.NOT_FOUND);
		}
        return new ResponseEntity<List<Publicacion>>(publicaciones, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)    
	public ResponseEntity<Cartelera> listarCartelera(@PathVariable("id") long id) {
		Cartelera cartelera = carteleraDAO.obtenerPorId(id);
        return new ResponseEntity<Cartelera>(cartelera, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}/AlumnosInteresados", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)    
	public List<Alumno> listarAlumnosInteresados(@PathVariable("id") long id) {
		List<Alumno> alumnos = carteleraDAO.obtenerAlumnosInteresados(id);
	    if(alumnos.isEmpty()){
	    	return null;
    	}
	    return alumnos;
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Void> crearCartelera(@RequestBody Cartelera cartelera, UriComponentsBuilder ucBuilder){
		carteleraDAO.guardar(cartelera);
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/Cartelera/{id}").buildAndExpand(cartelera.getId()).toUri());
		
		return new ResponseEntity<Void>(headers, HttpStatus.CREATED); 
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.POST)
	public ResponseEntity<Cartelera> agregarPublicacion(@RequestBody Publicacion publicacion, @PathVariable("id") long idCartelera, UriComponentsBuilder ucBuilder){
		Cartelera cartelera = carteleraDAO.obtener(idCartelera);
		if (publicacion.getMultimedia() != ""){
			publicacion.setTieneArchivo(1);
		}
		publicacionDAO.guardar(publicacion);
		cartelera.agregarPublicacion(publicacion);		
		carteleraDAO.modificar(cartelera);
		return new ResponseEntity<Cartelera>(cartelera, HttpStatus.OK); 
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Cartelera> actualizarCartelera(@PathVariable("id") long id, @RequestBody Cartelera cartelera) {
		Cartelera actual = carteleraDAO.obtener(id);
		if (actual == null) {
			return new ResponseEntity<Cartelera>(HttpStatus.NOT_FOUND);
		}
		actual.setNombre(cartelera.getNombre());
		actual.setPublica(cartelera.getPublica());
		carteleraDAO.modificar(actual);
		return new ResponseEntity<Cartelera>(actual, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)    
	public ResponseEntity<Cartelera> eliminarPublicacion(@PathVariable("id") long id) {
        Cartelera cartelera = carteleraDAO.obtener(id);
        if (cartelera == null) {
        	return new ResponseEntity<Cartelera>(HttpStatus.NOT_FOUND);
    	}
        cartelera.setBorrado(1);
        carteleraDAO.modificar(cartelera);
        return new ResponseEntity<Cartelera>(cartelera, HttpStatus.OK);
    }
}
