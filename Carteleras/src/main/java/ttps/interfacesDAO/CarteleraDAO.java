package ttps.interfacesDAO;

import java.util.List;

import ttps.clases.*;
import ttps.clasesDAO.*;

public interface CarteleraDAO extends GenericDAO<Cartelera>{
	List<Publicacion> obtenerPublicaciones(long id);
	List<Publicacion> obtenerPublicacionesDeUnPublicador(long id, long idPublicador);
	List<Alumno> obtenerAlumnosInteresados(long id);
	void eliminarCartelerasDeIntereses(long id);
	void eliminar(Cartelera entity);
	void remover(long id);
	List<Cartelera> obtenerCarteleras();
	List<Cartelera> obtenerCartelerasHabilitadas(long idPublicador);
	Cartelera obtenerPorId(long id);
}
