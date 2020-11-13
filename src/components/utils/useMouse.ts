import { ref, Ref, watch } from "vue";

export function useMouse(target?: HTMLElement | Ref<HTMLElement | null>) {
    const targetRef = ref(target);
    const x = ref(0);
    const y = ref(0);

    let stop = () => {};

    stop = watch(targetRef, (el: HTMLElement, prevEl: HTMLElement, onCleanup) => {
        
        const moveHandler = (event: MouseEvent) => {
            x.value = event.pageX;
            y.value = event.pageY;
        };

        console.log('use useMouse', {el, prevEl, targetRef: targetRef.value});

        el && el.addEventListener("mousemove", moveHandler);

        onCleanup(() => {
            //debugger
            console.log('cleanup useMouse', {el, prevEl, targetRef: targetRef.value});

            el && el.removeEventListener("mousemove", moveHandler);
        });
    }, { immediate: true });

    return {
        x,
        y,
        stop
    };
}
