import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <div className="flex justify-center items-center px-16 py-20 w-full bg-gray-100 max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col items-center w-full max-w-6xl max-md:max-w-full">
          <div className="flex flex-col pb-8 max-w-full w-[284px]">
            <div className="flex flex-col">
              <div className="flex justify-center items-center self-center px-px w-9">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/3cafa9fd04a3bbd828e4f4532095fba2ffe4c3ff24267443fa6876e4f2347d83?apiKey=c62a455a8e834db1ac749b30467de15e&"
                  className="w-full aspect-[0.97]"
                />
              </div>
              <div className="flex flex-col pt-2 text-base tracking-tight leading-6 text-center text-gray-600 max-w-[586px]">
                <div className="justify-center">
                  Dedicated to the well-being of your pets.
                </div>
              </div>
            </div>
          </div>
          <div className="flex-wrap content-start self-stretch max-md:max-w-full">
            <div className="flex justify-center items-center text-center gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow max-md:mt-10">
                  <div className="justify-center text-lg font-bold tracking-tight leading-7 text-gray-800">
                    Quick Links
                  </div>
                  <div className="flex flex-col pt-2 text-sm tracking-tight leading-5 text-gray-600 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="justify-center">Home</div>
                      <div className="justify-center">Services</div>
                      <div className="justify-center">Gallery</div>
                      <div className="justify-center">Testimonials</div>
                      <div className="justify-center">Contact</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow pb-3 text-sm tracking-tight leading-5 text-gray-600 max-md:mt-10">
                  <div className="justify-center text-lg font-bold tracking-tight leading-7 text-gray-800">
                    Contact Us
                  </div>
                  <div className="flex flex-col pt-2">
                    <div className="justify-center">123 Pet Care Road</div>
                  </div>
                  <div className="justify-center">Petland, PL 45678</div>
                  <div className="flex flex-col pt-2">
                    <div className="justify-center">Email: info@petcare.com</div>
                  </div>
                  <div className="justify-center">Phone: 555-1234</div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow pb-16 max-md:mt-10">
                  <div className="justify-center text-lg font-bold tracking-tight leading-7 text-gray-800">
                    Follow Us
                  </div>
                  <div className="flex flex-col pt-2">
                    <div className="flex gap-4 max-md:pr-5 justify-center items-center text-center">
                      <div className="flex flex-col justify-center py-1">
                        <div className="flex justify-center items-center px-px">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a0010836910b60bda2b762aae75dce8b227e1dde799f3c572ced0f0bda1f0c83?apiKey=c62a455a8e834db1ac749b30467de15e&"
                            className="aspect-[0.96] w-[33px]"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col justify-center py-1">
                        <div className="flex justify-center items-center px-px">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/141c2c3d8b77d97f2fcab2c314d58077466ce7efe41510e39e1bb4e86061c48e?apiKey=c62a455a8e834db1ac749b30467de15e&"
                            className="aspect-[0.96] w-[33px]"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col justify-center py-1">
                        <div className="flex justify-center items-center px-px">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e084d80f5b1af7d2e84f91ab945accaff62c43e1a437513524c335b281ca22d?apiKey=c62a455a8e834db1ac749b30467de15e&"
                            className="aspect-[0.96] w-[33px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col pt-8 max-w-full text-sm tracking-tight leading-5 text-center text-gray-600 w-[226px]">
            <div className="flex flex-col justify-center">
              <div className="justify-center">
                © 2024 Pet Care. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
