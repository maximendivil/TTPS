package ttps.rest;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.inject.Inject;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import ttps.clases.*;
import ttps.jwt.TokenManagerSecurity;
import ttps.clasesDAO.*;
import ttps.interfacesDAO.PersonaDAO;

/**
 * @author Manuel Ortiz - ortizman@gmail.com
 *
 * Nov 28, 2016
 */
@CrossOrigin
@RestController
@RequestMapping(value = "/Usuarios")
public class LoginController {
	
	@Inject
	private PersonaDAO loginService;
	
	@Inject
	private TokenManagerSecurity tokenManagerSecurity;
	
	@PostMapping("/Login")
	public ResponseEntity<?> login(@RequestBody Persona userPost) {
		try {
			Persona user = loginService.obtenerPorUsuario(userPost.getUsuario());
			String clase = "";
			if (esPerfilDeGuarani(user.getRol())){
				clase = setClase(user.getRol());
				chequearConGuarani(userPost, clase);
			}
			else {
				user = (Persona) loginService.login(userPost.getUsuario(), userPost.getPassword());
			}			
			Token token = new Token(tokenManagerSecurity.createJWT(user));	
			
			JSONObject json = new JSONObject();
			JSONObject json1 = new JSONObject(user);
			JSONObject json2 = new JSONObject(token);
			json.put("token",json2);
			json.put("usuario", json1);
			return ResponseEntity.ok(json.toString());
		} catch (Exception e) {
			return new ResponseEntity<>(Collections.singletonMap("AuthenticationException",e.getMessage()), HttpStatus.UNAUTHORIZED);
		}
	}
	
	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<List<Persona>> listarUsuarios() {
	    List<Persona> usuarios = loginService.obtenerTodosLosUsuarios();
	    //List<Cartelera> carteleras = carteleraDAO.obtenerTodos();
	    if(usuarios.isEmpty()){
	    	//return new ResponseEntity<List<Cartelera>>(HttpStatus.NO_CONTENT); 
    	}
	    //String json = new Gson().toJson(carteleras);
	    return new ResponseEntity<List<Persona>>(usuarios,HttpStatus.OK);
	    //return json;
	}
	
	@RequestMapping(value="/Get/{rol}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<List<Persona>> listarUsuariosPorRol(@PathVariable("rol") int rol) {
	    List<Persona> usuarios = loginService.obtenerPorRol(rol);
	    //List<Cartelera> carteleras = carteleraDAO.obtenerTodos();
	    if(usuarios.isEmpty()){
	    	//return new ResponseEntity<List<Cartelera>>(HttpStatus.NO_CONTENT); 
    	}
	    //String json = new Gson().toJson(carteleras);
	    return new ResponseEntity<List<Persona>>(usuarios,HttpStatus.OK);
	    //return json;
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)    
	public ResponseEntity<Persona> obtenerUsuario(@PathVariable("id") long id) {
		Persona usuario = loginService.obtenerPorId(id);
		if (usuario == null) { 
			return new ResponseEntity<Persona>(HttpStatus.NOT_FOUND);
		}
        return new ResponseEntity<Persona>(usuario, HttpStatus.OK);
	}
	
	@RequestMapping( method = RequestMethod.PUT, value = "/modificar", consumes= MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> modificarUsuario(@RequestBody Persona userPost) {	
		Persona persona;
		if (userPost.getRol() == 1) {
			persona = new Administrador();
		}
		else if (userPost.getRol() == 2) {
			persona = new Profesor();
		}
		else if(userPost.getRol() == 3) {
			persona = new Alumno();
		}
		else {
			persona = new Publicador();
		}
		persona.setId(userPost.getId());
		persona.setApellido(userPost.getApellido());
		persona.setNombre(userPost.getNombre());
		persona.setBorrado(userPost.getBorrado());
		persona.setDni(userPost.getDni());
		persona.setEmail(userPost.getEmail());
		persona.setFechaNacimiento(userPost.getFechaNacimiento());
		persona.setRol(userPost.getRol());
		persona.setUsuario(userPost.getUsuario());
		persona.setPassword(userPost.getPassword());
		loginService.modificar(persona);
		return new ResponseEntity<Void>(HttpStatus.OK);		
	}
	
	@RequestMapping( method = RequestMethod.PUT, value = "/modificarPermisos", consumes= MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> modificarPermisos(@RequestBody Persona userPost) {	
		Persona persona = loginService.obtener(userPost.getId());
		persona.setRol(userPost.getRol());
		loginService.modificar(persona);
		return new ResponseEntity<Void>(HttpStatus.OK);		
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Void> Alta(@RequestBody Persona userPost) {
		Persona nuevoUsuario;
		if (userPost.getRol() == 1) {
			nuevoUsuario = new Administrador();			
		}
		else if (userPost.getRol() == 2) {
			nuevoUsuario = new Profesor();
		}
		else if (userPost.getRol() == 3) {
			nuevoUsuario = new Alumno();
		}
		else {
			nuevoUsuario = new Publicador();
		}
		nuevoUsuario.setApellido(userPost.getApellido());
		nuevoUsuario.setNombre(userPost.getNombre());
		nuevoUsuario.setDni(userPost.getDni());
		nuevoUsuario.setEmail(userPost.getEmail());
		nuevoUsuario.setFechaNacimiento(userPost.getFechaNacimiento());
		nuevoUsuario.setRol(userPost.getRol());
		nuevoUsuario.setUsuario(userPost.getUsuario());
		nuevoUsuario.setPassword(userPost.getPassword());
		loginService.guardar(nuevoUsuario);
		return new ResponseEntity<Void>(HttpStatus.CREATED); 		
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)    
	public ResponseEntity<Void> eliminarUsuario(@PathVariable("id") long id) {
		Persona persona = loginService.obtener(id);
		persona.setBorrado(1);
		loginService.modificar(persona);
		return new ResponseEntity<Void>(HttpStatus.OK);
    }
	
	private boolean esPerfilDeGuarani(int rol) {
		if ((rol == 2) || (rol == 3)){
			return true;
		}
		return false;
	}
	
	private String setClase(int rol){
		String clase;
		if (rol == 2){
			clase = "Profesor";
		}
		else {
			clase = "Alumno";
		}
		return clase;
	}
	private void chequearConGuarani(Persona user, String clase) throws JSONException {
		try {

			HttpClient httpClient = HttpClientBuilder.create().build();
			HttpPost postRequest = new HttpPost("http://localhost:8080/APIRESTGuarani/" + clase + "/chequearlogin");
			
			JSONObject json = new JSONObject();
			json.put("usuario", user.getUsuario());
			json.put("contraseņa", user.getPassword());
			
			StringEntity httpEntity = new StringEntity(json.toString(),ContentType.APPLICATION_JSON);
			
			postRequest.setEntity(httpEntity);
		    
			HttpResponse response = httpClient.execute(postRequest);
			
			if (response.getStatusLine().getStatusCode() != 200) {
				throw new IllegalArgumentException("Usuario o password invalido");
			}

		  } catch (MalformedURLException e) {

			e.printStackTrace();

		  } catch (IOException e) {

			e.printStackTrace();

		  }
	}

}