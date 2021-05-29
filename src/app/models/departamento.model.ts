import { Deserializable } from './deserializable.model';

export class DepartamentoModel implements Deserializable  {
    public Id: number;
    public Nombre: string;    

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}