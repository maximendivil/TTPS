package ttps.interfacesDAO;

import java.util.List;
import java.util.Set;

import ttps.clases.Cartelera;
import ttps.clases.Comentario;
import ttps.clases.Publicacion;
import ttps.clases.Publicador;

public interface PublicadorDAO extends GenericDAO<Publicador> {
	List<Publicacion> obtenerPublicaciones(long id);
	List<Cartelera> obtenerCartelerasHabilitadas(long id);
	List<Publicador> obtenerPublicadoresHabilitados(long idCartelera);
	List<Publicador> obtenerPublicadoresSinPermiso(Cartelera cartelera);
}
