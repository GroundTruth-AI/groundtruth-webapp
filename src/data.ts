interface Customer {
    id: number,
    slug: string,
    name: string
}

export const customers = [
    { id: 2, slug: 'groundtruth', name: 'GroundTruth AI' },
    { id: -1, slug: 'orbit-inc', name: 'Orbit Inc.' },
    { id: -2, slug: 'max-and-obi', name: 'Max & Obi Ltd.' }
]