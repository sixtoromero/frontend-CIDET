import { Deserializable } from './deserializable.model';
import { OptionsModel } from './options.model';

export class MunicipioModel implements Deserializable  {
    
    public Id: number;
    public Nombre: string;
    public DepartamentoId: number;
    public CodigoDANE: string;
    public EsDistrito: boolean;
    public EsDistritoOpt: OptionsModel;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}