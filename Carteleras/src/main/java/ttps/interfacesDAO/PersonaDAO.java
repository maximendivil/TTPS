package ttps.interfacesDAO;

import java.util.List;

import ttps.clases.Administrador;
import ttps.clases.Cartelera;
import ttps.clases.Persona;
import ttps.clases.Publicador;

public interface PersonaDAO extends GenericDAO<Persona>{
	public Persona login(String userLogin, String password);
	public void logout(Persona user);
	public Persona obtenerPorUsuario(String usuario);
	public Persona obtenerPorId(long id);
	public List<Persona> obtenerPorRol(int rol);
	public int buscarRol(String usuario);
	public List<Persona> obtenerTodosLosUsuarios();
	public List<Publicador> obtenerPublicadores();
	public List<Cartelera> obtenerIntereses(long id);
}
