export const knownPrimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
export const highestKnownPrime = () => knownPrimes[knownPrimes.length - 1]

// returns an array of primes lower than `max`
export const primes = (max = 100) => {
  let p = highestKnownPrime()
  while (p < max) {
    p = nextPrime(p)
    if (p > highestKnownPrime()) knownPrimes.push(p)
  }
  return knownPrimes.filter(p => p < max)
}

// returns the next prime after `n`
export const nextPrime = (n: number): number => {
  // if it's in the range of the list, just look it up
  if (n < highestKnownPrime()) return knownPrimes.find(p => p > n) as number

  // brute-force time
  let candidates = candidateGenerator(n)
  let candidate
  do candidate = candidates.next().value
  while (!isPrime(candidate))

  return candidate
}

export const nthPrime = (n: number): number => {
  let i = 1
  let p = 2 // 2 is the first prime
  while (i++ < n) p = nextPrime(p)
  return p
}

// uses the fact that every prime over 30 is in one of the forms
// 30k ± 1, 30k ± 7, 30k ± 11, 30k ± 13
// This allows us to eliminate more than half (11/15 = 73%) of the search space
export const candidateGenerator = function*(n: number) {
  const B = 30
  const D = [-13, -11, -7, -1, 1, 7, 11, 13]
  let i = 0
  let base = Math.trunc(n / B) * B
  while (true) {
    let candidate = base + D[i]
    if (candidate > n) yield candidate
    i += 1
    if (i >= D.length) {
      base += B
      i = 0
    }
  }
}

// returns true if a number is prime, false if it is composite
export const isPrime = (n: number) => {
  // negative numbers and zero are not prime
  if (n < 1) return false

  // if it's in the range of the list, then it's only prime if it's on the list
  const hnp = highestKnownPrime()
  if (n <= hnp) return knownPrimes.includes(n)

  const sqrt = Math.sqrt(n)

  // if it's divisible by a number on the list, it's not prime
  if (knownPrimes.find(p => n % p === 0)) return false
  // if it's not divisible by a number on the list and it's
  // smaller than the square of the largest known prime, then it's prime
  else if (sqrt < hnp) return true

  // Brute-force time
  let candidate = hnp
  let candidates = candidateGenerator(candidate)
  do {
    if (n % candidate === 0) return false
    candidate = candidates.next().value
  } while (candidate <= sqrt)

  // must be prime
  return true
}
