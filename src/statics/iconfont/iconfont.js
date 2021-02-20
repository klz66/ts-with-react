import { createGlobalStyle  } from 'styled-components'

export const GlobalIconStyled = createGlobalStyle `
@font-face {font-family: "iconfont";
  src: url('./iconfont.eot?t=1613811677773'); /* IE9 */
  src: url('./iconfont.eot?t=1613811677773#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAZYAAsAAAAADBgAAAYJAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCEGAqJeIgIATYCJAMoCxYABCAFhG0HgQIbSAoRFaQ7k/1IjGNS1ll+E+3RmMkg3KzZ7AbCBqup0zcNcCYS7hxeameicC5P35S+OwGw79z3+Y6FjlAj+d2xR581sI6y16UH/3M/n7fWnQeyurY12IBmGJkUad00Hg14QPUjAySS/wfArxKdl056wTsZCACOWGSDWJ54ToEEBk5DkDVq+ND+kGxWsBASgWTQ+OzIQFogQhKWCrcBvKn+PfkGhUQCBIgU3KleGtI8CPU+qWs1Vf0qelEVan5uANfdAAogGwADyFpf73JQPZENCv6+PsMIAIEwg0LwST6Tr8xX4Zvt+7yrsWu13w+3gNJmnJcgkCcEewGhlTNFUDBooYMG7J+nAWn1wM1K6gCfJDJAAHwmBhDAV6pBmK4MZojQVcAMCt1smMGg+xwM0AJdjQzQAV2rdeh5DF89GEAcQCYA5B+Gs7gFiDxJA3IwAQyizHkwo0yvNxADl+IN3IsNMIfqJSlE1gfpmWagvcxqs9tsimIdPKBfT9tAu7W/MpOZtSZilILEUR0hWHUuRXbtCBu6x5Fp2+1MHzTUOsimWLkSQMyjvV5bZ6f9rbesjx/PENSKJra+bK+32/LdhDj2uHYB6k6Fq6u2uXascaze7ty6cubKs8n67ecjRdOAFWGGZSHQmzhZ/7BUf/R+NLhzp7orRGab3mo2XOtMEuUVexy7h7n2hNHlu507Iai7+BUh1CG0bJdhQ3XXxEEd6jJX2NAVjtAhy53nzJCR/ft1rDvmKNi6c9VMm7uTVFZWx2pXZ511mWvPmgl1/6mK12viNr3CR8rdeyyP5WvDu/U/I7sATriHO+8Sh93u4M5q69GdUHfJrkuEzHQtUzu42bncsUKeek6tHrSzWNl6OnJ1lH1D1lC3a1DwznClY1mYfUdWWM9B1qE2657N568+2XNZdfSJp9nVSa0ny8es50WySA9dfz5kLHFo8458FKls/1FEIro4qokHqor6eqD+38IiycOLNnr0hqwDB5IKko4dL+RCFy/9sFw74LJlx4+FNLa1tbvdqAfCnj3D/v6LSaqzF+sZZqrOKiLMki/lrqePH9ENdP3JtJ7C/OiRZNrwCC9p2ceJxofGpJgi4wNToWFksbFzdvTsa9FX50TP8aLg4zBdYounJVHXUe0eKx/MOiinNs/8NpWhPqseLPVbsxKv/Di2Xff8c62eVmys6xj3oyW+6cvdZovpTWNzfPNFpM9Yb1LMb5qscVYTRiyjfxubFbjnbtlcYlhlsBzYX2wsltSW5wOVwNIR+F/gvx8s6vltTtiu2N05obsOlsgo21jpdovJgyuFpYcPL4VKuNiEpbRx5eDkl9zulRFFMedbhJEtLSPJLLTodfQh4Bny5IN0y4PBRv+AJu+I2hetQuOA4bWd7J/aiZOulOcRsSF3bIZtuKG3/Gx95ed97JNuRYT8E5nyU0osylUz/yD4Ay5fbMl7yX2TlyxZGjk+ZcjEyS+/nDJ+08rFSxr7fXHNiimvA7Ah+RNShxDlvxsNDYMGNzY0LcbmJdpV49DXAwD+x/QizVaRI/Qx5Q3qpxMO5xa+og0AIBwQHgL+f+lcCob4qSf1Md1Izf+ilcDsw7b3NVX/JslH1sT7th8/oB38KgNVAUgQgNiy/4wsZh/7KDgbZ6/ORPlfU999P9IKtgkO4L8SDMSHeetDYscAAukku4IALWKAQkIyiuGyQYSMYtBAQh1wZOHJ3WUEYQIoCNMByMRCBgRmHAABRriBwow7KIb7AESE4jvQwEwocNhI0AFlpBJavH5KjM4E7T/EYLMIDr/Wst9Z84jJqlDJ35zWGIa6qJzpN5455bHJ+qONu4Akm+CVnY7H0WBJ1nPwonNfzmUpfs9UBJs212hKjM4E7T/EYLPI4/3a9fvvrHnEFNL0zf/NaY3TQ11UMVBv2jlW07oUrj/aOMUE5JppE7ySm0c+YbD4L+s5eNGliC3nkoZJXG1Rvn6a2opjsQX3AJwIhBJGRKIhWiIRHeFEhjSxsxxw1lMbZVcfL4TYrIrmtwLOocv1/b/lRwbObvnCSrwWjxLGLNo94K6Nmw0AAA==') format('woff2'),
  url('./iconfont.woff?t=1613811677773') format('woff'),
  url('iconfont.ttf?t=1613811677773') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('iconfont.svg?t=1613811677773#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`;
