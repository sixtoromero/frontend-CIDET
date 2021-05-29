import { Deserializable } from './deserializable.model';

export class OptionsModel implements Deserializable  {
    
    public label: number;
    public value: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}