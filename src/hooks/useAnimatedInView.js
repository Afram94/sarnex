import { useInView } from 'react-intersection-observer';

export function useAnimatedInView(threshold = 0.3) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold,
  });

  return [ref, inView];
}