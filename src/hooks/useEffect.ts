import { _state } from "../state";

export default function useEffect(
    func: () => (() => void) | void,
    deps: any[],
    id: string
) {
    const useEffectId = (_state.get(`${id}_useEffect_id`) ?? -1) + 1;
    const funcArr = _state.get(`${id}_useEffect_func`) || [];
    const depsArr = _state.get(`${id}_useEffect_deps`) || [];

    funcArr[useEffectId] = func;
    depsArr[useEffectId] = deps;

    _state.set(`${id}_useEffect_id`, useEffectId);
    _state.set(`${id}_useEffect_func`, funcArr);
    _state.set(`${id}_useEffect_deps`, depsArr);
}